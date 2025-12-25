// Cache middleware for product responses
// Adds cache-control headers to reduce server load and improve performance

export const cacheProducts = (req, res, next) => {
  // Cache product list for 5 minutes (300 seconds)
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  next();
};

export const cacheProductDetails = (req, res, next) => {
  // Cache individual product details for 10 minutes (600 seconds)
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  next();
};

export const noCache = (req, res, next) => {
  // Don't cache user-specific or admin data
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
};
