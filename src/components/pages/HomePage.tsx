import { useEffect, useState, useRef } from 'react';
import webapis from '../../libs/tizens/webapis';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVideoPlay, setIsVideoPlay] = useState(false);
  const videoList = useRef<string[]>([
    'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
  ]);
  const durationRef = useRef<number>(0);
  const currentIndex = useRef(0);

  useEffect(() => {
    playVideoAtIndex(currentIndex.current);

    // Cleanup when component unmounts
    return () => {
      webapis.avplay.stop?.();
      webapis.avplay.close?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playVideoAtIndex = (index: number) => {
    const path = videoList.current[index];

    try {
      webapis.avplay.stop?.();
      webapis.avplay.close?.();

      webapis.avplay.open(path);
      webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
      webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_FULL_SCREEN');

      webapis.avplay.setListener({
        oncurrentplaytime: (currentTime: number) => {
          // Durasi biasanya dalam ms, kita pakai detik
          if (durationRef.current > 0 && currentTime >= durationRef.current - 1000) {
            console.log('Video ended manually via currentTime');
            webapis.avplay.stop();
            playNextVideo();
          }
        },
        onstreamcompleted: () => {
          console.log('onstreamcompleted triggered for:', path);
          playNextVideo();
        },
        onerror: (error: any) => {
          console.error('Playback error:', error);
          playNextVideo();
        },
      });

      webapis.avplay.prepareAsync(
        () => {
          try {
            const duration = webapis.avplay.getDuration(); // in ms
            durationRef.current = duration;
            console.log('Video duration:', duration, 'ms');
          } catch (e) {
            console.warn('getDuration() failed:', e);
            durationRef.current = 0;
          }

          webapis.avplay.play();
          setIsVideoPlay(true);
          console.log('Now Playing:', path);
        },
        (err: any) => {
          console.error('prepareAsync error:', err);
          playNextVideo();
        },
      );
    } catch (e) {
      console.error('startPlayback error:', e);
      playNextVideo();
    }
  };

  const playNextVideo = () => {
    currentIndex.current = (currentIndex.current + 1) % videoList.current.length;
    playVideoAtIndex(currentIndex.current);
  };

  const handlePlayPauseVideo = () => {
    if (isVideoPlay) {
      webapis.avplay.pause();
      setIsVideoPlay(false);
    } else {
      webapis.avplay.play();
      setIsVideoPlay(true);
    }
  };

  const handleNavigateToPlaylist = () => {
    webapis.avplay.stop?.();
    webapis.avplay.close?.();
    navigate('/playlist');
  };

  return (
    <div className="absolute bg-black/[0.1] top-0 left-0 z-[9999] text-white text-[50px] p-[20px] w-full h-full">
      <div>Looping Video Player</div>
      <button style={{ fontSize: 50 }} onClick={handlePlayPauseVideo}>
        {isVideoPlay ? 'Pause' : 'Play'}
      </button>
      <button style={{ fontSize: 50 }} onClick={handleNavigateToPlaylist}>
        Playlist
      </button>
    </div>
  );
};

export default HomePage;
