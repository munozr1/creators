import './App.css';
import Bento from './components/bento';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LegalPage from './components/LegalPage';

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const animationRef = useRef(null);
  const timeoutRef = useRef(null); // Ref to hold the timeout ID
  
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
  }, [dynamicText, currentWordIndex, isDeleting, isInView]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomeContent 
            dynamicText={dynamicText} 
            animationRef={animationRef} 
            isInView={isInView} 
            cursorVisible={cursorVisible} 
          />
        } />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Home page content component
function HomeContent({ dynamicText, animationRef, isInView, cursorVisible }) {
  return (
    <div>
    <div className="flex flex-col min-h-screen">
      <header className="">
        <div className="pt-2 flex justify-between items-center">
          <Link to="/" className="text-lg font-bold font-mono">CreatorQ</Link>
          <nav className="flex gap-4">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/" className="navbar-item">About</Link>
            <Link to="/legal" className="navbar-item">Legal</Link>
          </nav>
          <button className="corner-frame">login</button>
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
              <button className="corner-frame w-36 mt-6">try now</button>
            </div>
            <img
              alt=""
              src="/arrow-drawn-up.png"
              className="h80 object-cover object-left"
            />
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
    <footer className="mt-auto py-4 text-sm text-gray-500 border-t border-gray-200 text-center">
        © {new Date().getFullYear()} CreatorQ. All rights reserved. | <Link to="/legal" className="text-blue-600 hover:underline">Terms & Privacy</Link>
      </footer>
    </div>
  );
}

export default App
