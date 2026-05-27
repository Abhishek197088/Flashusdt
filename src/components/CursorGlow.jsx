import React, { useState, useEffect } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if mouse is within window boundaries
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Dynamic Cursor Light Overlay */}
      <div
        className="fixed pointer-events-none z-30 w-[450px] h-[450px] rounded-full bg-green-500/8 blur-[130px] transition-opacity duration-500 ease-out"
        style={{
          left: `${position.x - 225}px`,
          top: `${position.y - 225}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Neon glowing decorative blobs */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[150px] animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[5%] w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[170px] animate-pulse-slow pointer-events-none -z-10" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[10%] left-[15%] w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] animate-pulse-slow pointer-events-none -z-10" style={{ animationDelay: '4s' }} />
    </>
  );
}
