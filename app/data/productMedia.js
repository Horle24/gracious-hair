// productMedia.js
// Add / swap URLs freely. Each product can have up to 4 images + 1 video.
// Keys match the product IDs in your products data.

export const PRODUCT_MEDIA = {
  1: {
    images: [
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=800&q=85&fit=crop',            // front
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=800&q=85&fit=crop&crop=top',   // back
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&q=85&fit=crop&crop=top',   // side
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=800&q=85&fit=crop&crop=top',   // detail
    ],
    video: null, // e.g. 'https://your-cdn.com/products/1/showcase.mp4'
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
  2: {
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&q=85&fit=crop',
    ],
    video: null,
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
  3: {
    images: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=800&q=85&fit=crop',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=800&q=85&fit=crop&crop=top',
    ],
    video: null,
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
  4: {
    images: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=800&q=85&fit=crop&crop=top',
    ],
    video: null,
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
  5: {
    images: [
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&q=85&fit=crop',
      'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=800&q=85&fit=crop&crop=top',
    ],
    video: null,
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
  6: {
    images: [
      'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=800&q=85&fit=crop',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&q=85&fit=crop&crop=top',
    ],
    video: null,
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
  7: {
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&q=85&fit=crop',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=800&q=85&fit=crop&crop=top',
    ],
    video: null,
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
  8: {
    images: [
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&q=85&fit=crop',
      'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=800&h=800&q=85&fit=crop&crop=top',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=800&q=85&fit=crop',
    ],
    video: null,
    labels: ['Front', 'Back', 'Side', 'Detail'],
  },
};

// Fallback single image (used if a product ID has no entry above)
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&q=85&fit=crop';