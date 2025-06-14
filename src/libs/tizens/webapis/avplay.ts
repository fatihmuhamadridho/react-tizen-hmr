const getAvplay = () => {
  if (typeof window !== "undefined" && (window as any)?.webapis?.avplay) {
    return (window as any)?.webapis?.avplay;
  }
  return null;
};

const open = (url: string) => getAvplay()?.open(url);
const play = () => getAvplay()?.play();
const pause = () => getAvplay()?.pause();
const stop = () => getAvplay()?.stop();
const close = () => getAvplay()?.close();
const prepareAsync = (onSuccess: () => void, onError: (err: any) => void) =>
  getAvplay()?.prepareAsync(onSuccess, onError);
const setDisplayRect = (x: number, y: number, w: number, h: number) =>
  getAvplay()?.setDisplayRect(x, y, w, h);
const setDisplayMethod = (mode: string) => getAvplay()?.setDisplayMethod(mode);

const avplay = {
  open,
  play,
  pause,
  stop,
  close,
  prepareAsync,
  setDisplayRect,
  setDisplayMethod,
};

export default avplay;
