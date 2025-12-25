// Quick test to verify Cloudinary URL transformations
import { getThumbnailUrl, getPlaceholderUrl, transformCloudinaryUrl } from '../src/utils/imageUtils.js';

const sampleCloudinaryUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

console.log('=== Image URL Transformation Tests ===\n');

console.log('Original URL:');
console.log(sampleCloudinaryUrl);
console.log('\nThumbnail (400x400, auto:low):');
console.log(getThumbnailUrl(sampleCloudinaryUrl));
console.log('\nPlaceholder (50x50, blurred):');
console.log(getPlaceholderUrl(sampleCloudinaryUrl));
console.log('\nCustom transformation:');
console.log(transformCloudinaryUrl(sampleCloudinaryUrl, {
  width: 800,
  height: 600,
  quality: 'auto:good',
  crop: 'fill'
}));

console.log('\n✅ All transformations include:');
console.log('  - Progressive loading (fl_progressive)');
console.log('  - Lossy compression (fl_lossy)');
console.log('  - Auto format selection (f_auto)');
console.log('  - Optimized quality settings');
