import React from 'react';
import Bento from '../components/bento'; // Adjust path if needed
import * as QRCodeReact from 'qrcode.react'; // Import as namespace

// Access the default export explicitly
const QRCode = QRCodeReact.default;

// Component for the Home page content
function HomePage({ handleLoginClick, isLoginPending, showQrCode, loginStatus, qrCodeUrl, errorMessage, authToken, dynamicText, animationRef, isInView, cursorVisible }) {
  return (
    <>
        <div className="grid-bg-left "></div>
         <div className="grid-bg-right "></div>
         <section className=" hero-section fade-sides">
            {/* Content Container */}
            <div className=" content flex flex-col sm:flex-row items-center w-full h-full justify-center">

             {/* Left Side: Text Content */}
             <div className="flex flex-col items-center text-center sm:text-left sm:items-start w-full sm:w-[33rem] mb-8 sm:mb-0 sm:mr-8">
                <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight mb-6 text-gray-950 sm:text-5xl">
                  the BEST creator analytics platform
                </p>
                <p className="text-gray-400 text-left">
                  CreatorQ users are 10x more likely to grow their audience by
                  making data-driven decisions. Use our platform to track your
                  audience growth, engagement, and more.
                </p>
                 {/* Show Try Now button only if not showing QR code and not logged in */}
                 {!showQrCode && !authToken && (
                    <button
                        className="corner-frame w-36 mt-6"
                        onClick={handleLoginClick}
                        disabled={isLoginPending}
                    >
                      Try Now
                    </button>
                 )}
             </div>

            {/* Right Side: Image OR QR Code Display */}
            <div className="flex justify-center items-center w-full sm:w-auto h-[300px]">
              {!showQrCode ? (
                 <img
                    alt="Illustration showing an upward arrow"
                    src="/arrow-drawn-up.png"
                    className="h-full object-contain max-w-full"
                 />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4 border border-gray-300 rounded bg-white h-full w-[300px]">
                  {loginStatus === 'pending_qr' && <p className="text-gray-500 animate-pulse">Loading QR Code...</p>}
                  {qrCodeUrl && ['pending_scan', 'scanned', 'expired'].includes(loginStatus) && (
                     <QRCode value={qrCodeUrl} size={220} level="M" />
                  )}
                  <div className="mt-auto pt-2">
                      {loginStatus === 'pending_scan' && <p className="text-blue-600 text-sm font-medium">Scan with TikTok app</p>}
                      {loginStatus === 'scanned' && <p className="text-yellow-600 text-sm font-medium">Scanned! Confirm on phone.</p>}
                      {loginStatus === 'expired' && <p className="text-red-600 text-sm font-medium">{errorMessage || 'QR Code Expired.'}</p>}
                      {loginStatus === 'error' && <p className="text-red-600 text-sm font-medium">{errorMessage || 'An error occurred.'}</p>}
                       {(loginStatus === 'expired' || loginStatus === 'error') && (
                           <button className="corner-frame mt-2 px-3 py-1 text-xs" onClick={handleLoginClick}>
                               Retry
                           </button>
                       )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- Bento Grid and Stats --- */}
           <Bento />
           <div className="top-section mt-10 max-w-2xl mx-auto lg:max-w-7xl">
             Trusted by the world's fastest growing
             {/* Typing Animation Span */}
             <span className="highlight mr-1 ml-1" ref={animationRef}>
                 {dynamicText}
                <span className={(isInView && cursorVisible) ? 'cursor-visible' : 'cursor-hidden'}>|</span>
             </span>
             content creators
           </div>

           <div className="max-w-2xl mx-auto lg:max-w-7xl stats-container flex flex-col sm:flex-row">
             {/* Stats */}
             <div className="border-1 border-[#ccc] w-full flex justify-center py-5"><div className="stat-box"><div className="stat-value">65700</div><div className="stat-label">FOLLOWRS</div></div></div>
             <div className="border-1 border-[#ccc] w-full flex justify-center py-5"><div className="stat-box"><div className="stat-value">21B</div><div className="stat-label">VIEWS</div></div></div>
             <div className="border-1 border-[#ccc] w-full flex justify-center py-5"><div className="stat-box"><div className="stat-value">17303</div><div className="stat-label">LIKES</div></div></div>
           </div>
          </section>
    </>
  );
}

export default HomePage; 
