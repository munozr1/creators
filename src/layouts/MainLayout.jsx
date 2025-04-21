import React from 'react';
import { Link } from 'react-router-dom';

// Component for the main layout including header and footer
function MainLayout({ children, handleLoginClick, isLoginPending, authToken, loginStatus }) {
  return (
    <>
      <header className="">
        <div className="pt-2 flex justify-between items-center">
          <Link to="/" className="text-lg font-bold font-mono no-underline text-black hover:opacity-80">
            CreatorQ
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/" className="navbar-item">About</Link> {/* Assuming About still links to home for now */}
            <Link to="/legal" className="navbar-item">Legal</Link>
          </nav>
          {authToken ? (
            <span className="text-sm font-medium text-green-600 px-4 py-2 border border-green-300 rounded">Logged In!</span>
          ) : (
            <button
              className="corner-frame"
              onClick={handleLoginClick}
              disabled={isLoginPending}
            >
              {isLoginPending ? 'Logging in...' : (loginStatus === 'error' || loginStatus === 'expired' ? 'Try Again' : 'Login')}
            </button>
          )}
        </div>
      </header>
      <main className="min-h-screen">
        {children} {/* Render page-specific content here */}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} CreatorQ. All rights reserved. | <Link to="/legal" className="text-blue-600 hover:underline">Terms & Privacy</Link>
      </footer>
    </>
  );
}

export default MainLayout; 
