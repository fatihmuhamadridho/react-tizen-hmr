import { useEffect, useState, useRef } from 'react';
import webapis from '../../libs/tizens/webapis';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVideoPlay, setIsVideoPlay] = useState(false);
  const videoList = useRef<string[]>([
    'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    'https://filesamples.com/samples/video/mp4/sample_640x360.mp4',
    'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_5mb.mp4',
  ]);
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
        oncurrentplaytime: (time: number) => {
          // Optional: bisa dipakai untuk tracking waktu
        },
        onstreamcompleted: () => {
          console.log('Video finished:', path);
          playNextVideo();
        },
        onerror: (error: any) => {
          console.error('Playback error:', error);
          playNextVideo(); // Lanjutkan meski error
        },
      });

      webapis.avplay.prepareAsync(
        () => {
          webapis.avplay.play();
          setIsVideoPlay(true);
          console.log('Now Playing:', path);
        },
        (err: any) => {
          console.error('prepareAsync error:', err);
          playNextVideo(); // Lanjut jika gagal prepare
        },
      );
    } catch (e) {
      console.error('startPlayback error:', e);
      playNextVideo(); // Lanjut jika error runtime
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
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
        color: 'white',
        fontSize: 50,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        padding: 20,
        width: '100%',
        height: '100%',
      }}
    >
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
