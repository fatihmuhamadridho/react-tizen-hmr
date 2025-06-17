'use client';

import React, { useEffect, useRef, useState } from 'react';

const WebOSPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRefs = [
    useRef<HTMLButtonElement>(null), // Play
    useRef<HTMLButtonElement>(null), // Pause
    useRef<HTMLButtonElement>(null), // File Manager
    useRef<HTMLButtonElement>(null), // Mute
    useRef<HTMLButtonElement>(null), // Unmute
  ];
  const [focusIndex, setFocusIndex] = useState(0);
  const [fileManagerMessage, setFileManagerMessage] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      video.muted = false;
      video.volume = 1.0;

      const handleLoaded = () => {
        video.play().catch((e) => console.error('Play failed:', e));
      };

      video.addEventListener('loadeddata', handleLoaded);
      video.load();

      return () => {
        video.removeEventListener('loadeddata', handleLoaded);
      };
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const nextIndex = e.key === 'ArrowRight' ? (focusIndex + 1) % buttonRefs.length : (focusIndex - 1 + buttonRefs.length) % buttonRefs.length;

        setFocusIndex(nextIndex);
        buttonRefs[nextIndex].current?.focus();
      }

      if (e.key === 'Enter' || e.key === 'OK') {
        buttonRefs[focusIndex].current?.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusIndex]);

  useEffect(() => {
    // Fokus default saat load
    buttonRefs[0].current?.focus();
  }, []);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
    }
  };

  const handleUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
    }
  };

  const handleOpenFileManager = () => {
    if (typeof window !== 'undefined' && (window as any).webOS) {
      (window as any).webOS.service.request('luna://com.webos.mediadb', {
        method: 'find',
        parameters: {
          query: {
            from: 'com.webos.mediadb.video',
            where: [
              {
                prop: 'type',
                op: '=',
                val: 'video',
              },
            ],
          },
        },
        onSuccess: (res: any) => {
          const videos = res.results || [];
          if (videos.length === 0) {
            setFileManagerMessage('📁 No video files found in media database.');
          } else {
            const list = videos.map((v: any) => v.title || v.uri || v.path).join(', ');
            setFileManagerMessage(`🎬 Found ${videos.length} videos: ${list}`);
            console.log('Video entries:', videos);
          }
        },
        onFailure: (err: any) => {
          console.error('Failed to query media database:', err);
          setFileManagerMessage(`❌ Failed to query media database: ${err.errorText || JSON.stringify(err)}`);
        },
      });
    } else {
      setFileManagerMessage('⚠️ Not running on a webOS device.');
    }
  };

  return (
    <div>
      {/* Tombol kontrol */}
      <div className="absolute z-[99999] top-10 left-10 flex gap-4">
        <button
          ref={buttonRefs[0]}
          tabIndex={0}
          onClick={handlePlay}
          className="bg-white text-black px-6 py-3 text-xl rounded-xl shadow-lg hover:bg-gray-300 transition focus:outline focus:outline-2 focus:outline-blue-500"
        >
          Play
        </button>

        <button
          ref={buttonRefs[1]}
          tabIndex={0}
          onClick={handlePause}
          className="bg-white text-black px-6 py-3 text-xl rounded-xl shadow-lg hover:bg-gray-300 transition focus:outline focus:outline-2 focus:outline-blue-500"
        >
          Pause
        </button>

        <button
          ref={buttonRefs[2]}
          tabIndex={0}
          onClick={handleOpenFileManager}
          className="bg-white text-black px-6 py-3 text-xl rounded-xl shadow-lg hover:bg-gray-300 transition focus:outline focus:outline-2 focus:outline-blue-500"
        >
          Open File Manager
        </button>

        <button
          ref={buttonRefs[3]}
          tabIndex={0}
          onClick={handleMute}
          className="bg-white text-black px-6 py-3 text-xl rounded-xl shadow-lg hover:bg-gray-300 transition focus:outline focus:outline-2 focus:outline-blue-500"
        >
          Mute
        </button>

        <button
          ref={buttonRefs[4]}
          tabIndex={0}
          onClick={handleUnmute}
          className="bg-white text-black px-6 py-3 text-xl rounded-xl shadow-lg hover:bg-gray-300 transition focus:outline focus:outline-2 focus:outline-blue-500"
        >
          Unmute
        </button>
      </div>

      <div className="bg-black text-white text-x">{JSON.stringify((window as any).webOS)}</div>

      {/* Status Message */}
      <div className="absolute top-32 left-10 bg-white text-black px-4 py-2 rounded-xl shadow">{fileManagerMessage}</div>

      {/* Video Player */}
      <div className="w-full h-screen bg-black">
        <video ref={videoRef} controls className="w-full h-full object-contain bg-black" />
      </div>
    </div>
  );
};

export default WebOSPage;
