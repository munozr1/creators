/**
 * TikTok Video Endpoints
 * 
 * This file contains endpoints for fetching video data from TikTok API.
 * Add this to your main server file.
 */

// This function should be added to your httpHandler function or Express app
export function addVideoEndpoints(app, TIKTOK_API_BASE) {
  // Endpoint to fetch user videos
  app.get('/user/videos', async (req, res) => {
    // Extract bearer token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      // First, exchange the token for a TikTok access token if not already done
      // This is a simplified example. In production, you'd store and check for existing access tokens
      
      // Endpoint for getting user videos
      const videosUrl = `${TIKTOK_API_BASE}/video/list/`;
      const params = new URLSearchParams();
      params.append('fields', 'id,title,cover_image_url,statistics,create_time');
      params.append('max_count', '3'); // Limit to 3 videos
      
      const response = await fetch(videosUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Use the user's access token
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching videos from TikTok:', errorData);
        return res.status(response.status).json({ 
          error: 'Failed to fetch videos from TikTok', 
          details: errorData 
        });
      }
      
      const data = await response.json();
      
      // Transform the data to match our frontend expectations
      const videos = data.data.videos.map(video => ({
        id: video.id,
        title: video.title || 'Untitled Video',
        cover: video.cover_image_url,
        stats: {
          views: video.statistics.view_count || 0,
          likes: video.statistics.like_count || 0,
          comments: video.statistics.comment_count || 0,
          shares: video.statistics.share_count || 0
        },
        create_time: video.create_time
      }));
      
      res.json({ videos });
      
    } catch (error) {
      console.error('Error in /user/videos endpoint:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}

// Instructions to add this to your server:
/*
// In your main server.js file:

// Import the function
import { addVideoEndpoints } from './videos-endpoint.js';

// Add this to your server setup
addVideoEndpoints(app, TIKTOK_API_BASE);
*/ 
