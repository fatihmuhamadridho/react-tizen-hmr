const getAvplay = () => {
  if (typeof window !== 'undefined' && (window as any)?.webapis?.avplay) {
    return (window as any).webapis.avplay;
  }
  return null;
};

const avplay = {
  open: (url: string) => getAvplay()?.open(url),
  close: () => getAvplay()?.close(),
  prepare: () => getAvplay()?.prepare(),
  prepareAsync: (onSuccess?: () => void, onError?: (err: any) => void) => getAvplay()?.prepareAsync(onSuccess, onError),
  setDisplayRect: (x: number, y: number, w: number, h: number) => getAvplay()?.setDisplayRect(x, y, w, h),
  getVideoSeamlessInfo: () => getAvplay()?.getVideoSeamlessInfo(),
  play: () => getAvplay()?.play(),
  seekTo: (ms: number, onSuccess?: () => void, onError?: (err: any) => void) => getAvplay()?.seekTo(ms, onSuccess, onError),
  stop: () => getAvplay()?.stop(),
  getState: () => getAvplay()?.getState(),
  pause: () => getAvplay()?.pause(),
  jumpForward: (ms: number, onSuccess?: () => void, onError?: (err: any) => void) => getAvplay()?.jumpForward(ms, onSuccess, onError),
  jumpBackward: (ms: number, onSuccess?: () => void, onError?: (err: any) => void) => getAvplay()?.jumpBackward(ms, onSuccess, onError),
  getDuration: () => getAvplay()?.getDuration(),
  getCurrentTime: () => getAvplay()?.getCurrentTime(),
  setTimeoutForBuffering: (sec: number) => getAvplay()?.setTimeoutForBuffering(sec),
  setBufferingParam: (option: string, unit: string, amount: number) => getAvplay()?.setBufferingParam(option, unit, amount),
  setSpeed: (speed: number) => getAvplay()?.setSpeed(speed),
  setListener: (listener: any) => getAvplay()?.setListener(listener),
  setDrm: (type: string, operation: string, param: string) => getAvplay()?.setDrm(type, operation, param),
  getUID: (type: string) => getAvplay()?.getUID(type),
  setSoundAnalysisListener: (listener: any) => getAvplay()?.setSoundAnalysisListener(listener),
  unsetSoundAnalysisListener: () => getAvplay()?.unsetSoundAnalysisListener(),
  setSilentSubtitle: (onoff: boolean) => getAvplay()?.setSilentSubtitle(onoff),
  setExternalSubtitlePath: (path: string) => getAvplay()?.setExternalSubtitlePath(path),
  setSubtitlePosition: (pos: number) => getAvplay()?.setSubtitlePosition(pos),
  setDisplayMethod: (mode: string) => getAvplay()?.setDisplayMethod(mode),
  setSelectTrack: (type: string, index: number) => getAvplay()?.setSelectTrack(type, index),
  getCurrentStreamInfo: () => getAvplay()?.getCurrentStreamInfo(),
  getTotalTrackInfo: () => getAvplay()?.getTotalTrackInfo(),
  setStreamingProperty: (type: string, param: string) => getAvplay()?.setStreamingProperty(type, param),
  getStreamingProperty: (type: string) => getAvplay()?.getStreamingProperty(type),
  getVersion: () => getAvplay()?.getVersion(),
  suspend: () => getAvplay()?.suspend(),
  setLooping: (loop: boolean) => getAvplay()?.setLooping(loop),
  setVideoStillMode: (mode: string) => getAvplay()?.setVideoStillMode(mode),
  setDisplayRotation: (rotation: string) => getAvplay()?.setDisplayRotation(rotation),
  restore: (url?: string, resumeTime?: number, bPrepare?: boolean) => getAvplay()?.restore(url, resumeTime, bPrepare),
  restoreAsync: (url?: string, resumeTime?: number, bPrepare?: boolean, onSuccess?: () => void, onError?: (err: any) => void) =>
    getAvplay()?.restoreAsync(url, resumeTime, bPrepare, onSuccess, onError),
  enableAudioStream: () => getAvplay()?.enableAudioStream(),
  disableAudioStream: () => getAvplay()?.disableAudioStream(),
  setVideoRoi: (x: number, y: number, w: number, h: number) => getAvplay()?.setVideoRoi(x, y, w, h),
};

export default avplay;
