import { useEffect, useState } from 'react';
import webapis from '../../libs/tizens/webapis';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false);
  const videoPath = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  useEffect(() => {
    startPlayback(videoPath);
  }, []);

  const startPlayback = (path: string) => {
    try {
      webapis.avplay.stop?.();
      webapis.avplay.close?.();

      webapis.avplay.open(path);
      webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
      webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_FULL_SCREEN');
      webapis.avplay.prepareAsync(
        () => {
          webapis.avplay.play();
          setIsVideoPlay(true);
          console.log('Now Playing:', path);
        },
        (err: any) => console.error('prepareAsync error:', err),
      );
    } catch (e) {
      console.error('startPlayback error:', e);
    }
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
    <div>
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
        }}
      >
        <div>BigBuckBunny test.mp4</div>
        <button style={{ fontSize: 50 }} onClick={handlePlayPauseVideo}>
          {isVideoPlay ? 'Pause' : 'Play'}
        </button>
        <button style={{ fontSize: 50 }} onClick={handleNavigateToPlaylist}>
          Playlist
        </button>
      </div>
    </div>
  );
};

export default HomePage;
