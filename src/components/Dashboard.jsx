import React from 'react';
import { Link } from 'react-router-dom';
import TopVideos from './TopVideos';

function Dashboard({ authToken }) {
  // Use authToken to potentially display user info
  const truncatedToken = authToken ? `${authToken.substring(0, 8)}...` : '';
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="">
        <div className="pt-2 flex justify-between items-center">
          <Link to="/" className="text-lg font-bold font-mono">CreatorQ</Link>
          <nav className="flex gap-4">
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <Link to="/analytics" className="navbar-item">Analytics</Link>
            <Link to="/legal" className="navbar-item">Legal</Link>
          </nav>
          <span className="text-sm font-medium text-green-600 px-4 py-2 border border-green-300 rounded">
            Logged In {truncatedToken && `(ID: ${truncatedToken})`}
          </span>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
            
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your TikTok Analytics
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Overview of your content performance
                </p>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Followers
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          65,700
                        </dd>
                        <dd className="mt-1 text-sm text-green-600">
                          +2.5% from last week
                        </dd>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Views
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          21M
                        </dd>
                        <dd className="mt-1 text-sm text-green-600">
                          +18.2% from last month
                        </dd>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Engagement Rate
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          4.2%
                        </dd>
                        <dd className="mt-1 text-sm text-red-600">
                          -0.3% from last week
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Display the user's top videos */}
            <TopVideos authToken={authToken} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard; 
