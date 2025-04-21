import React, { useEffect, useState } from 'react';

export default function TopVideos({ authToken }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Define API URL based on environment
  const BACKEND_URL = import.meta.env.DEV 
    ? "http://localhost:3001" 
    : "https://api.codemeet.dev";
  
  useEffect(() => {
    async function fetchVideos() {
      if (!authToken) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        const response = await fetch(`${BACKEND_URL}/user/videos`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.status}`);
        }
        
        const data = await response.json();
        setVideos(data.videos?.slice(0, 3) || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
        setLoading(false);
        
        // Use sample data for development/demo
        if (import.meta.env.DEV) {
          setVideos([
            {
              id: 'v1',
              title: 'TikTok Dance Challenge',
              cover: 'https://placehold.co/300x500/333/FFF?text=Dance',
              stats: { views: 158000, likes: 12300, comments: 840, shares: 320 },
              create_time: '2023-11-15T14:32:00Z'
            },
            {
              id: 'v2',
              title: 'Morning Routine',
              cover: 'https://placehold.co/300x500/444/FFF?text=Routine',
              stats: { views: 89500, likes: 7800, comments: 450, shares: 210 },
              create_time: '2023-11-10T09:15:00Z'
            },
            {
              id: 'v3',
              title: 'Outfit Ideas for Winter',
              cover: 'https://placehold.co/300x500/555/FFF?text=Fashion',
              stats: { views: 112000, likes: 9200, comments: 620, shares: 180 },
              create_time: '2023-11-05T17:45:00Z'
            }
          ]);
        }
      }
    }
    
    fetchVideos();
  }, [authToken, BACKEND_URL]);
  
  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Top Videos</h3>
          <div className="mt-4 flex justify-center">
            <div className="animate-pulse text-center py-10">
              <p className="text-gray-500">Loading your recent videos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error && videos.length === 0) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Top Videos</h3>
          <div className="mt-4 bg-red-50 p-4 rounded-md">
            <p className="text-red-600">Error loading videos: {error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Your Top Videos</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Your most recent TikTok videos
        </p>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {videos.map(video => (
            <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pb-[177%]"> {/* 9:16 aspect ratio */}
                <img 
                  src={video.cover}
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900 truncate">{video.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{formatDate(video.create_time)}</p>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="block text-gray-500">Views</span>
                    <span className="font-medium">{formatNumber(video.stats.views)}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Likes</span>
                    <span className="font-medium">{formatNumber(video.stats.likes)}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Comments</span>
                    <span className="font-medium">{formatNumber(video.stats.comments)}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Shares</span>
                    <span className="font-medium">{formatNumber(video.stats.shares)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {videos.length === 0 && (
            <div className="sm:col-span-3 text-center py-10 border border-gray-200 rounded-lg">
              <p className="text-gray-500">No videos found</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200">
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="button" className="corner-frame">
            View All Videos
          </button>
        </div>
      </div>
    </div>
  );
}