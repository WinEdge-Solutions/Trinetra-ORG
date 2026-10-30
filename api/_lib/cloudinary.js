/**
 * Cloudinary Utility Client — Trinetra Gargi Foundation
 *
 * Provides:
 * 1. Configured cloudinary instance for server-side uploads
 * 2. Helper to generate auto-optimized URLs (auto-format, auto-quality, responsive sizes)
 * 3. Face-blur URL transformation for POCSO-compliant beneficiary photos
 * 4. PDF upload and preview thumbnail generation
 */

const cloudinary = require('cloudinary').v2;

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
}

/**
 * Generate an optimized CDN URL for any public ID
 * @param {string} publicId - e.g. 'trinetra-gargi-foundation/schemes/palhar-yojana'
 * @param {object} options - width, height, crop, blurFace
 */
function getOptimizedImageUrl(publicId, options = {}) {
  if (!publicId) return '';
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId; // already a full URL
  }

  const transformations = [
    'f_auto', // auto webp/avif
    'q_auto'  // auto quality compression
  ];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);

  // Safeguarding & POCSO Compliance: blur identifiable human faces
  if (options.blurFace) {
    transformations.push('e_blur_faces:1000');
  }

  const transformString = transformations.join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
}

/**
 * Generate a thumbnail preview URL for a PDF file
 */
function getPdfThumbnailUrl(publicId, page = 1) {
  if (!publicId) return '';
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600,pg_${page}/${publicId}.jpg`;
}

/**
 * Server-side upload helper
 */
async function uploadToCloudinary(filePathOrBuffer, folder = 'trinetra-gargi-foundation/general', resourceType = 'auto') {
  return cloudinary.uploader.upload(filePathOrBuffer, {
    folder,
    resource_type: resourceType,
    use_filename: true,
    unique_filename: true,
    overwrite: false
  });
}

module.exports = {
  cloudinary,
  getOptimizedImageUrl,
  getPdfThumbnailUrl,
  uploadToCloudinary
};

