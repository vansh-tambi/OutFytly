// Utility functions for optimizing Cloudinary image URLs

/**
 * Transforms a Cloudinary image URL with specified parameters
 * @param {string} url - The original Cloudinary URL
 * @param {object} transformations - Transformation options
 * @param {number} transformations.width - Max width
 * @param {number} transformations.height - Max height
 * @param {string} transformations.crop - Crop mode (e.g., 'limit', 'fill')
 * @param {string} transformations.quality - Quality setting (e.g., 'auto', 'auto:low', 'auto:good')
 * @param {string} transformations.format - Format setting (e.g., 'auto')
 * @param {boolean} transformations.fetchFormat - Use fetch_format for better optimization
 * @returns {string} - Transformed URL
 */
export const transformCloudinaryUrl = (url, transformations = {}) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original if not a Cloudinary URL
  }

  const { 
    width, 
    height, 
    crop = 'limit', 
    quality = 'auto:good', 
    format = 'auto',
    fetchFormat = true 
  } = transformations;

  // Split the URL to insert transformations
  const urlParts = url.split('/upload/');
  if (urlParts.length !== 2) return url;

  // Build transformation string with optimizations
  const params = [];
  if (width) params.push(`w_${width}`);
  if (height) params.push(`h_${height}`);
  params.push(`c_${crop}`);
  params.push(`q_${quality}`);
  if (fetchFormat) {
    params.push(`f_${format}`);
  }
  
  // Add additional optimizations
  params.push('fl_progressive'); // Progressive JPEG loading
  params.push('fl_lossy'); // Lossy compression for smaller files

  const transformationString = params.join(',');
  const transformedUrl = `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;

  return transformedUrl;
};

/**
 * Get optimized thumbnail URL (300x300) with low quality for fast loading
 * @param {string} url - Original image URL
 * @returns {string} - Optimized thumbnail URL
 */
export const getThumbnailUrl = (url) => {
  return transformCloudinaryUrl(url, { 
    width: 400, 
    height: 400,
    quality: 'auto:low', // Lower quality for thumbnails = faster load
    crop: 'fill' // Fill to maintain aspect ratio
  });
};

/**
 * Get optimized main image URL (800x800)
 * @param {string} url - Original image URL
 * @returns {string} - Optimized main image URL
 */
export const getMainImageUrl = (url) => {
  return transformCloudinaryUrl(url, { 
    width: 800, 
    height: 800,
    quality: 'auto:good'
  });
};

/**
 * Get optimized large image URL (1200x1200) for high-res displays
 * @param {string} url - Original image URL
 * @returns {string} - Optimized large image URL
 */
export const getLargeImageUrl = (url) => {
  return transformCloudinaryUrl(url, { 
    width: 1200, 
    height: 1200,
    quality: 'auto:good'
  });
};

/**
 * Get a tiny blurred placeholder URL (50x50) for progressive loading
 * @param {string} url - Original image URL
 * @returns {string} - Placeholder URL
 */
export const getPlaceholderUrl = (url) => {
  return transformCloudinaryUrl(url, { 
    width: 50, 
    height: 50,
    quality: 'auto:low',
    crop: 'fill'
  });
};