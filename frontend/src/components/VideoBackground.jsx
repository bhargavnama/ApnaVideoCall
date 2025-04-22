import React, { useRef, useEffect, useState } from 'react';
import styles from './VideoBackground.module.css';

const VideoBackground = () => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();

    // Try to play video
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log('Video autoplay failed:', error);
          // If autoplay fails, we'll use the fallback background
          setIsMobile(true);
        }
      }
    };

    playVideo();
  }, []);

  return (
    <div className={styles.videoContainer}>
      {!isMobile && (
        <video
          ref={videoRef}
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
      )}
      <div className={styles.overlay}></div>
      {isMobile && <div className={styles.mobileBackground}></div>}
    </div>
  );
};

export default VideoBackground; 