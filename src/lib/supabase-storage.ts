import { supabase } from './supabase';

/**
 * Upload an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'content-images')
 * @returns The public URL of the uploaded image
 */
export async function uploadImageToSupabase(
  file: File,
  bucket: string = 'content-images'
): Promise<string> {
  try {
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image to Supabase:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The URL or path of the image to delete
 * @param bucket - The storage bucket name (default: 'content-images')
 */
export async function deleteImageFromSupabase(
  imageUrl: string,
  bucket: string = 'content-images'
): Promise<void> {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.warn('Error deleting image from Supabase:', error);
      // Don't throw - image deletion failure shouldn't block content deletion
    }
  } catch (error) {
    console.warn('Error deleting image from Supabase:', error);
    // Don't throw - image deletion failure shouldn't block content deletion
  }
}
