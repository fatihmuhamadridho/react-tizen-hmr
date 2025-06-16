'use client';

import React, { useEffect, useRef } from 'react';

const WebOSPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto play saat pertama render
    const video = videoRef.current;
    if (video) {
      video.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      video.load();
      video.play().catch((e) => console.error('Auto-play failed:', e));
    }
  }, []);

  const handleOpenFileManager = () => {
    const video = videoRef.current;

    // 1. Stop dan pause video
    if (video) {
      video.pause();
      video.removeAttribute('src'); // optional: release the video URL
      video.load();
    }

    // 2. Buka file manager (native app)
    if (typeof window !== 'undefined' && (window as any).webOS) {
      (window as any).webOS.service.request('luna://com.webos.service.activitymanager', {
        method: 'launch',
        parameters: {
          id: 'com.webos.app.filemanager',
          params: {},
        },
        onSuccess: () => {
          console.log('File manager launched');
        },
        onFailure: (err: any) => {
          console.error('Failed to launch file manager', err);
        },
      });
    } else {
      console.warn('Not running on webOS device.');
    }
  };

  return (
    <div>
      {/* Tombol untuk membuka file manager */}
      <div className="absolute z-[99999] top-10 left-10">
        <button onClick={handleOpenFileManager} className="bg-white text-black px-6 py-3 text-xl rounded-xl shadow-lg hover:bg-gray-300 transition">
          Open File Manager
        </button>
      </div>

      {/* Video Player */}
      <div className="w-full h-screen bg-black">
        <video ref={videoRef} controls className="w-full h-full object-contain bg-black" />
      </div>
    </div>
  );
};

export default WebOSPage;
