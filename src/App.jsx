import './App.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import LegalPage from './components/LegalPage';
import Dashboard from './components/Dashboard';
import LandingPage from './pages/LandingPage';
// Backend configuration
// Automatically switch between development and production URLs
const isDevelopment = import.meta.env.DEV;
const BACKEND_URL = isDevelopment 
  ? "http://localhost:3001" 
  : "https://api.codemeet.dev";
const WEBSOCKET_URL = isDevelopment 
  ? "ws://localhost:3001" 
  : "wss://api.codemeet.dev";

console.log(`Running in ${isDevelopment ? 'development' : 'production'} mode`);
console.log(`Backend URL: ${BACKEND_URL}`);
console.log(`WebSocket URL: ${WEBSOCKET_URL}`);

function App() {
  // TikTok auth state
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loginStatus, setLoginStatus] = useState('idle');
  const [authToken, setAuthToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const wsRef = useRef(null);


  // State and logic for the "spacecraft" typing animation
  
  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch(`${BACKEND_URL}/exchange-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const data = await response.json();
      setAuthToken(data.access_token);
      console.log('Access token:', data.access_token);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      setErrorMessage('Failed to exchange code for token.');
    }
  };


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
                //exchange code for access token
                exchangeCodeForToken(message.code);
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
    alert('i dmed you the tiktok log in credentials on instagram, please check. ig: rigomx_');
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
          authToken ? (
            <Dashboard authToken={authToken} />
          ) : (
            <LandingPage 
              handleLoginClick={handleLoginClick}
              isLoginPending={isLoginPending}
              showQrCode={showQrCode}
              loginStatus={loginStatus}
              qrCodeUrl={qrCodeUrl}
              errorMessage={errorMessage}
              authToken={authToken}
            />
          )
        } />
        <Route path="/dashboard" element={
          authToken ? <Dashboard authToken={authToken} /> : <Navigate to="/" replace />
        } />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
