// Utility functions for managing content with Supabase

import { supabase } from './supabase';
import { uploadImageToSupabase, deleteImageFromSupabase } from './supabase-storage';

// Database schema type (matches Supabase table structure)
type SupabaseContentRow = {
  id: string;
  type: "blog" | "case-study" | "insight";
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  tags: string[];
  author: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContentItem = {
  id: string;
  type: "blog" | "case-study" | "insight";
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  imageUrl: string; // Can be URL or base64 data URL
  createdAt: string;
  published: boolean;
};

// Convert Supabase row to ContentItem
function mapSupabaseRowToContentItem(row: SupabaseContentRow): ContentItem {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt || '',
    category: row.category,
    tags: row.tags || [],
    author: row.author,
    imageUrl: row.image_url || '',
    createdAt: row.created_at,
    published: row.published,
  };
}

// Load all content from Supabase
export async function getSupabaseContent(): Promise<ContentItem[]> {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content from Supabase:', error);
      return [];
    }

    return (data || []).map(mapSupabaseRowToContentItem);
  } catch (error) {
    console.error('Error fetching content from Supabase:', error);
    return [];
  }
}

// Create new content in Supabase
export async function createSupabaseContent(
  content: Omit<ContentItem, 'id' | 'createdAt'>,
  imageFile?: File | null
): Promise<ContentItem | null> {
  try {
    let imageUrl = content.imageUrl;

    // Upload image if file is provided
    if (imageFile) {
      try {
        imageUrl = await uploadImageToSupabase(imageFile);
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw new Error('Failed to upload image');
      }
    }

    // Prepare data for Supabase
    const supabaseData = {
      type: content.type,
      title: content.title,
      content: content.content,
      excerpt: content.excerpt || null,
      category: content.category,
      tags: content.tags || [],
      author: content.author,
      image_url: imageUrl || null,
      published: content.published,
    };

    const { data, error } = await supabase
      .from('content')
      .insert([supabaseData])
      .select()
      .single();

    if (error) {
      console.error('Error creating content in Supabase:', error);
      throw error;
    }

    return data ? mapSupabaseRowToContentItem(data) : null;
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
}

// Update existing content in Supabase
export async function updateSupabaseContent(
  id: string,
  content: Partial<ContentItem>,
  imageFile?: File | null,
  deleteOldImage: boolean = false
): Promise<ContentItem | null> {
  try {
    // Get existing content to check for image deletion
    const { data: existingData } = await supabase
      .from('content')
      .select('image_url')
      .eq('id', id)
      .single();

    let imageUrl = content.imageUrl;

    // Upload new image if file is provided
    if (imageFile) {
      try {
        imageUrl = await uploadImageToSupabase(imageFile);
        
        // Delete old image if it exists and is in Supabase storage
        if (deleteOldImage && existingData?.image_url) {
          await deleteImageFromSupabase(existingData.image_url);
        }
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw new Error('Failed to upload image');
      }
    }

    // Prepare update data for Supabase
    const updateData: Partial<SupabaseContentRow> = {};
    
    if (content.type !== undefined) updateData.type = content.type;
    if (content.title !== undefined) updateData.title = content.title;
    if (content.content !== undefined) updateData.content = content.content;
    if (content.excerpt !== undefined) updateData.excerpt = content.excerpt || null;
    if (content.category !== undefined) updateData.category = content.category;
    if (content.tags !== undefined) updateData.tags = content.tags;
    if (content.author !== undefined) updateData.author = content.author;
    if (imageUrl !== undefined) updateData.image_url = imageUrl || null;
    if (content.published !== undefined) updateData.published = content.published;

    const { data, error } = await supabase
      .from('content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content in Supabase:', error);
      throw error;
    }

    return data ? mapSupabaseRowToContentItem(data) : null;
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
}

// Delete content from Supabase
export async function deleteSupabaseContent(id: string): Promise<boolean> {
  try {
    // Get existing content to delete associated image
    const { data: existingData } = await supabase
      .from('content')
      .select('image_url')
      .eq('id', id)
      .single();

    // Delete content from database
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting content from Supabase:', error);
      return false;
    }

    // Delete associated image if it exists and is in Supabase storage
    if (existingData?.image_url) {
      await deleteImageFromSupabase(existingData.image_url);
    }

    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
}

// Legacy localStorage functions (kept for backward compatibility or fallback)
// These can be removed if you're fully migrating to Supabase

// Load content from localStorage (submitted by users)
export function getLocalContent(): ContentItem[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem("submittedContent");
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading localStorage content:", error);
    return [];
  }
}

// Update existing content (localStorage - legacy)
export function updateLocalContent(id: string, updatedContent: ContentItem): void {
  if (typeof window === "undefined") return;
  
  try {
    const existingContent = getLocalContent();
    const index = existingContent.findIndex((item) => item.id === id);
    
    if (index !== -1) {
      existingContent[index] = { ...updatedContent, id }; // Preserve ID
      localStorage.setItem("submittedContent", JSON.stringify(existingContent));
      window.dispatchEvent(new Event("contentUpdated"));
    }
  } catch (error) {
    console.error("Error updating content:", error);
  }
}

// Delete content (localStorage - legacy)
export function deleteLocalContent(id: string): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const existingContent = getLocalContent();
    const filtered = existingContent.filter((item) => item.id !== id);
    
    if (filtered.length !== existingContent.length) {
      localStorage.setItem("submittedContent", JSON.stringify(filtered));
      window.dispatchEvent(new Event("contentUpdated"));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting content:", error);
    return false;
  }
}

// Get single content item by ID (async - fetches from Supabase)
export async function getContentById(
  id: string,
  staticContent: ContentItem[]
): Promise<ContentItem | null> {
  const allContent = await getAllContent(staticContent);
  return allContent.find((item) => item.id === id) || null;
}

// Legacy synchronous version
export function getContentByIdSync(
  id: string,
  staticContent: ContentItem[]
): ContentItem | null {
  const allContent = getAllContentSync(staticContent);
  return allContent.find((item) => item.id === id) || null;
}

// Combine static content (from JSON file) with Supabase content
export async function getAllContent(staticContent: ContentItem[]): Promise<ContentItem[]> {
  try {
    // Fetch content from Supabase
    const supabaseContent = await getSupabaseContent();
    
    // Combine static content with Supabase content and sort by date (newest first)
    const allContent = [...staticContent, ...supabaseContent];
    return allContent.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching content from Supabase:', error);
    // Fallback to static content + localStorage if Supabase fails
    const localContent = getLocalContent();
    const allContent = [...staticContent, ...localContent];
    return allContent.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

// Legacy synchronous version (for backward compatibility)
// This combines static content with localStorage content
export function getAllContentSync(staticContent: ContentItem[]): ContentItem[] {
  const localContent = getLocalContent();
  
  // Combine and sort by date (newest first)
  const allContent = [...staticContent, ...localContent];
  return allContent.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Filter content by type
export function filterContentByType(
  content: ContentItem[],
  type: "blog" | "case-study" | "insight"
): ContentItem[] {
  return content.filter((item) => item.type === type && item.published);
}

// Filter content by category
export function filterContentByCategory(
  content: ContentItem[],
  category: string
): ContentItem[] {
  if (!category) return content;
  return content.filter((item) => item.category === category);
}

// Export content as JSON (for downloading)
export function exportContentAsJSON(content: ContentItem[]): void {
  const jsonString = JSON.stringify(content, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `content-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
