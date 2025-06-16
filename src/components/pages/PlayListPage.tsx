import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const PlayListPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    loadVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadVideos = () => {
    waitForTizen()
      .then(() => getLocalVideos())
      .then(setVideos)
      .catch((err) => console.error('Error reading videos:', err));
  };
  const waitForTizen = (): Promise<void> => {
    return new Promise((resolve) => {
      const check = () => {
        if ((window as any).tizen?.filesystem) {
          resolve();
        } else {
          setTimeout(check, 100); // cek tiap 100ms
        }
      };
      check();
    });
  };

  const getLocalVideos = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      if (typeof (window as any).tizen === 'undefined' || typeof (window as any).tizen.filesystem?.resolve !== 'function') {
        console.warn('❗ Tizen filesystem not available yet.');
        return resolve([]); // Jangan lanjutkan kalau belum siap
      }

      const videoList: string[] = [];

      try {
        (window as any).tizen.filesystem.resolve(
          'videos',
          (dir: any) => {
            console.log('📁 Path:', dir.toURI());
            dir.listFiles(
              (files: any[]) => {
                files.forEach((file) => {
                  if (file.isFile && /\.(mp4|avi|mkv)$/i.test(file.name)) {
                    videoList.push(file.fullPath);
                  }
                });
                resolve(videoList);
              },
              (err: any) => reject(err),
            );
          },
          (e: any) => reject(e),
          'r',
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  const downloadVideo = async () => {
    const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', videoUrl, true);
      xhr.responseType = 'blob';

      xhr.onload = () => {
        if (xhr.status === 200) {
          const blob = xhr.response;

          (window as any).tizen.filesystem.resolve(
            'videos',
            (dir: any) => {
              dir.createFile(
                'downloaded-video.mp4',
                true,
                (file: any) => {
                  file.openStream(
                    'w',
                    (stream: any) => {
                      stream.writeBytes(blob);
                      stream.close();
                      alert('Download complete!');
                      loadVideos(); // Refresh list
                    },
                    (err: any) => console.error('Write error', err),
                  );
                },
                (err: any) => console.error('File create error', err),
              );
            },
            (err: any) => console.error('Dir resolve error', err),
            'rw',
          );
        } else {
          console.error('Failed to download:', xhr.status);
        }
      };

      xhr.onerror = () => console.error('Download failed');

      xhr.send();
    } catch (e) {
      console.error('Exception in download:', e);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
        color: 'white',
        fontSize: 40,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        padding: 20,
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <div>PlayListPage</div>
      <button onClick={() => navigate('/')} style={{ fontSize: 30 }}>
        Go To Player
      </button>
      <button onClick={downloadVideo} style={{ fontSize: 30, marginLeft: 20 }}>
        ⬇️ Download Video
      </button>

      <div style={{ marginTop: 30 }}>
        {videos.length === 0 && <div>No videos found</div>}
        {videos.map((path, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            {path}
          </div>
        ))}
      </div>
      <input type="file" />
    </div>
  );
};

export default PlayListPage;
