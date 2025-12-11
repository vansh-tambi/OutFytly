// Utility functions for optimizing Cloudinary image URLs

/**
 * Transforms a Cloudinary image URL with specified parameters
 * @param {string} url - The original Cloudinary URL
 * @param {object} transformations - Transformation options
 * @param {number} transformations.width - Max width
 * @param {number} transformations.height - Max height
 * @param {string} transformations.crop - Crop mode (e.g., 'limit', 'fill')
 * @param {string} transformations.quality - Quality setting (e.g., 'auto')
 * @param {string} transformations.format - Format setting (e.g., 'auto')
 * @returns {string} - Transformed URL
 */
export const transformCloudinaryUrl = (url, transformations = {}) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original if not a Cloudinary URL
  }

  const { width, height, crop = 'limit', quality = 'auto', format = 'auto' } = transformations;

  // Split the URL to insert transformations
  const urlParts = url.split('/upload/');
  if (urlParts.length !== 2) return url;

  const transformationString = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
  const transformedUrl = `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;

  return transformedUrl;
};

/**
 * Get optimized thumbnail URL (300x300)
 * @param {string} url - Original image URL
 * @returns {string} - Optimized thumbnail URL
 */
export const getThumbnailUrl = (url) => {
  return transformCloudinaryUrl(url, { width: 300, height: 300 });
};

/**
 * Get optimized main image URL (800x800)
 * @param {string} url - Original image URL
 * @returns {string} - Optimized main image URL
 */
export const getMainImageUrl = (url) => {
  return transformCloudinaryUrl(url, { width: 800, height: 800 });
};

/**
 * Get optimized large image URL (1200x1200) for high-res displays
 * @param {string} url - Original image URL
 * @returns {string} - Optimized large image URL
 */
export const getLargeImageUrl = (url) => {
  return transformCloudinaryUrl(url, { width: 1200, height: 1200 });
};