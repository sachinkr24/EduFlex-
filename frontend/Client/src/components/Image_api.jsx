// imageApi.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = '3F2LoccWCog6Kkc0nD-7oKDlMDUQsg7c9_y6KGje7qY';

export const fetchImages = async (posts) => {
  const urls = {};
  for (const post of posts) {
    const url = await getImageUrl(post.title);
    urls[post._id] = url;
  }
  return urls;
};

const getImageUrl = async (title) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: title, per_page: 1, order_by: 'latest' },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    if (response.data.results.length > 0) {
      return response.data.results[0].urls.small;
    } else {
      return `https://via.placeholder.com/150?text=${encodeURIComponent(title)}`; // Placeholder with title text
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    return `https://via.placeholder.com/150?text=${encodeURIComponent(title)}`; // Placeholder with title text on error
  }
};
