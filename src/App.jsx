import './App.css';
import Bento from './components/bento';
import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LegalPage from './components/LegalPage';
import { QRCodeSVG } from 'qrcode.react'; // Import the named export

// Backend configuration
const BACKEND_URL = 'http://localhost:3001';
const WEBSOCKET_URL = 'ws://localhost:3001';

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const animationRef = useRef(null);
  const timeoutRef = useRef(null); // Ref to hold the timeout ID
  
  // TikTok auth state
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loginStatus, setLoginStatus] = useState('idle');
  const [authToken, setAuthToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const wsRef = useRef(null);
  
  const words = ['gaming', 'makeup', 'fashion', 'irl', 'news'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseBeforeDelete = 2300;
  
  // State and logic for the "spacecraft" typing animation
  const [dynamicText, setDynamicText] = useState('');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = animationRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  useEffect(() => {
    let blinkCursor;
    if (isInView) {
      blinkCursor = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500);
    } else {
      setCursorVisible(false);
    }
    
    return () => clearInterval(blinkCursor);
  }, [isInView]);
  
  useEffect(() => {
    // Always clear previous timeout on effect run if it exists
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }

    if (!isInView) {
      return; // No cleanup needed here as timeout is cleared above
    }

    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      // --- Deletion Logic ---
      if (dynamicText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        // No timeout needed, state change triggers next cycle
      } else {
        timeoutRef.current = setTimeout(() => {
          setDynamicText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      // --- Typing Logic ---
      if (dynamicText === currentWord) {
        // Schedule timeout ONLY to trigger deletion state change after pause
        timeoutRef.current = setTimeout(() => {
           setIsDeleting(true); // Set isDeleting=true *after* the pause completes
        }, pauseBeforeDelete);
      } else {
        // Schedule timeout to type next character
        timeoutRef.current = setTimeout(() => {
          setDynamicText(currentWord.slice(0, dynamicText.length + 1));
        }, typingSpeed);
      }
    }

    // Cleanup function clears the timeout on unmount or dependency change
    return () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null; // Clear ref on cleanup
        }
    };
    // Reduced dependencies to only core state driving the animation + visibility
  }, [dynamicText, currentWordIndex, isDeleting, isInView, words]);

  // WebSocket Logic
  const setupWebSocket = useCallback((token) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }
    
    if (!token) {
      setLoginStatus('error');
      setErrorMessage('Failed to initialize session.');
      return;
    }
    
    try {
      wsRef.current = new WebSocket(WEBSOCKET_URL);
      
      // Add event handlers before sending any messages
      wsRef.current.onopen = () => {
        console.log("WebSocket connection opened");
        // Make sure to send the register message only after connection is fully established
        setTimeout(() => {
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'register', token }));
            console.log("Registration message sent");
          }
        }, 500);
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          console.log("WebSocket message received:", event.data);
          const message = JSON.parse(event.data);
          
          if (message.type === 'error') {
            setLoginStatus('error');
            setErrorMessage(message.message || 'Unknown error');
            return;
          }
          
          if (message.type === 'registered') {
            console.log("Successfully registered with the WebSocket server");
            setLoginStatus('pending_scan');
            return;
          }
          
          if (message.type === 'status_update') {
            console.log("Status update received:", message.status);
            switch (message.status) {
              case 'pending':
              case 'generated':
              case 'new':
                if (loginStatus !== 'scanned') setLoginStatus('pending_scan');
                break;
              case 'scanned':
                setLoginStatus('scanned');
                break;
              case 'confirmed':
                setLoginStatus('confirmed');
                setAuthToken(message.code);
                setShowQrCode(false);
                break;
              case 'expired':
                setLoginStatus('expired');
                setErrorMessage('QR code expired.');
                break;
              case 'utilised':
                setLoginStatus('error');
                setErrorMessage('Session already used.');
                break;
              default:
                console.log("Unknown status:", message.status);
                break;
            }
          }
        } catch (err) {
          console.error("Error handling WebSocket message:", err);
          setLoginStatus('error');
          setErrorMessage('Server message error.');
        }
      };
      
      wsRef.current.onerror = (event) => {
        console.error("WebSocket error:", event);
        setLoginStatus('error');
        setErrorMessage('WebSocket connection error.');
      };
      
      wsRef.current.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
        wsRef.current = null;
        
        // If not already in a final state, indicate the connection was lost
        if (!['confirmed', 'error', 'expired'].includes(loginStatus)) {
          setLoginStatus('error');
          setErrorMessage('Connection to server was lost.');
        }
      };
    } catch (err) {
      console.error("Error setting up WebSocket:", err);
      setLoginStatus('error');
      setErrorMessage('Failed to connect to server.');
    }
  }, [loginStatus, setLoginStatus, setErrorMessage, setAuthToken, setShowQrCode]);

  // QR Code Fetch Logic
  const handleLoginClick = async () => {
    // Only allow if in idle, error, or expired state
    if (loginStatus !== 'idle' && loginStatus !== 'error' && loginStatus !== 'expired') {
      return;
    }
    
    setShowQrCode(true);
    setLoginStatus('pending_qr');
    setErrorMessage('');
    setAuthToken(null);
    setQrCodeUrl('');
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    try {
      console.log("Fetching QR code");
      const response = await fetch(`${BACKEND_URL}/get-qr-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("QR code fetched successfully");
      
      if (!data.scan_qrcode_url || !data.token) {
        throw new Error('Invalid response from server');
      }
      
      setQrCodeUrl(data.scan_qrcode_url);
      console.log("Setting up WebSocket with token");
      setupWebSocket(data.token);
    } catch (error) {
      console.error("Error fetching QR code:", error);
      setLoginStatus('error');
      setErrorMessage(error.message || 'Failed to fetch QR code');
      setShowQrCode(false);
    }
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);
  
  const isLoginPending = ['pending_qr', 'pending_scan', 'scanned'].includes(loginStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomeContent 
            dynamicText={dynamicText} 
            animationRef={animationRef} 
            isInView={isInView} 
            cursorVisible={cursorVisible}
            handleLoginClick={handleLoginClick}
            isLoginPending={isLoginPending}
            showQrCode={showQrCode}
            loginStatus={loginStatus}
            qrCodeUrl={qrCodeUrl}
            errorMessage={errorMessage}
            authToken={authToken}
          />
        } />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Home page content component
function HomeContent({ 
  dynamicText, 
  animationRef, 
  isInView, 
  cursorVisible,
  handleLoginClick,
  isLoginPending,
  showQrCode,
  loginStatus,
  qrCodeUrl,
  errorMessage,
  authToken
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="">
        <div className="pt-2 flex justify-between items-center">
          <Link to="/" className="text-lg font-bold font-mono">CreatorQ</Link>
          <nav className="flex gap-4">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/" className="navbar-item">About</Link>
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

      <main className="flex-grow">
        <div className="grid-bg-left"></div>
        <div className="grid-bg-right"></div>
        <section className="hero-section fade-sides">
          <div className="content flex flex-col sm:flex-row items-center w-full h-full justify-center">
            <div className="flex flex-col items-center w-[33rem]">
              <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight mb-6 text-gray-950 sm:text-5xl">
                the BEST creator analytics platform
              </p>
              <p className="text-gray-400 text-left">
                CreatorQ users are 10x more likely to grow their audience by
                making data-driven decisions. Use our platform to track your
                audience growth, engagement, and more.
              </p>
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
            <div className="flex justify-center items-center h-[300px] w-[300px]">
              {!showQrCode ? (
                <img
                  alt="Illustration showing an upward arrow"
                  src="/arrow-drawn-up.png"
                  className="h-full object-contain max-w-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4 border border-gray-300 rounded bg-white h-full w-full">
                  {loginStatus === 'pending_qr' && <p className="text-gray-500 animate-pulse">Loading QR Code...</p>}
                  {qrCodeUrl && ['pending_scan', 'scanned', 'expired'].includes(loginStatus) && (
                    <QRCodeSVG value={qrCodeUrl} size={220} level="M" />
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

          <Bento />
          <div className="top-section mt-10 max-w-2xl mx-auto lg:max-w-7xl">
            Trusted by the world's fastest growing
            <span className="highlight mr-1 ml-1" ref={animationRef}>
                {dynamicText}
               <span className={(isInView && cursorVisible) ? 'cursor-visible' : 'cursor-hidden'}>|</span>
            </span>
            content creators
          </div>

          <div className="max-w-2xl mx-auto lg:max-w-7xl stats-container flex flex-col sm:flex-row">
            <div className="border-1 border-[#ccc] w-full flex justify-center py-5">
              <div className="stat-box">
                <div className="stat-value">65700</div>
                <div className="stat-label">FOLLOWRS</div>
              </div>
            </div>
            <div className="border-1 border-[#ccc] w-full flex justify-center py-5">
              <div className="stat-box">
                <div className="stat-value">21B</div>
                <div className="stat-label">VIEWS</div>
              </div>
            </div>
            <div className="border-1 border-[#ccc] w-full flex justify-center py-5">
              <div className="stat-box">
                <div className="stat-value">17303</div>
                <div className="stat-label">LIKES</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App
