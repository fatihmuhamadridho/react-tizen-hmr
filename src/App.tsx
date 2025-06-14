import { useEffect } from "react";

const HomePage = () => {
  const videoPath =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    startPlayback(videoPath);
  }, []);

  function startPlayback(path: any) {
    try {
      if ((window as any).avplay) {
        (window as any).avplay.stop();
        (window as any).avplay.close();
      }
      (window as any).avplay = (window as any).webapis.avplay;
      (window as any).avplay.open(path);
      (window as any).avplay.setDisplayRect(0, 0, 1920, 1080);
      (window as any).avplay.setDisplayMethod("PLAYER_DISPLAY_MODE_FULL_SCREEN");
      (window as any).avplay.prepareAsync(
        () => {
          (window as any).avplay.play();
          console.log("Now Playing:", path);
        },
        (e: any) => console.error("prepareAsync error:", e)
      );
    } catch (e) {
      console.error("startPlayback error:", e);
    }
  }

  return (
    <div>
      {/* Overlay Content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9999,
          color: "white",
          fontSize: 50,
          backgroundColor: "rgba(0, 0, 0, 1)",
          padding: 20,
        }}
      >
        <div>BigBuckBunny test.mp4</div>
      </div>
    </div>
  );
};

export default HomePage;
