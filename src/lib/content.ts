// Utility functions for managing content

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

// Save content to localStorage
export function saveLocalContent(content: ContentItem[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("submittedContent", JSON.stringify(content));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event("contentUpdated"));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Update existing content
export function updateLocalContent(id: string, updatedContent: ContentItem): void {
  if (typeof window === "undefined") return;
  
  try {
    const existingContent = getLocalContent();
    const index = existingContent.findIndex((item) => item.id === id);
    
    if (index !== -1) {
      existingContent[index] = { ...updatedContent, id }; // Preserve ID
      saveLocalContent(existingContent);
    }
  } catch (error) {
    console.error("Error updating content:", error);
  }
}

// Delete content
export function deleteLocalContent(id: string): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const existingContent = getLocalContent();
    const filtered = existingContent.filter((item) => item.id !== id);
    
    if (filtered.length !== existingContent.length) {
      saveLocalContent(filtered);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting content:", error);
    return false;
  }
}

// Get single content item by ID (requires static content to be passed)
export function getContentById(
  id: string,
  staticContent: ContentItem[]
): ContentItem | null {
  const allContent = getAllContent(staticContent);
  return allContent.find((item) => item.id === id) || null;
}

// Combine static content (from JSON file) with local content (from localStorage)
export function getAllContent(staticContent: ContentItem[]): ContentItem[] {
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
