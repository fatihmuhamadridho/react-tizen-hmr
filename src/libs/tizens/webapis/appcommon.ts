const getAppCommon = () => {
  if (typeof window !== 'undefined' && (window as any)?.webapis?.appcommon) {
    return (window as any).webapis.appcommon;
  }
  return null;
};

const appcommon = {
  getVersion: (): string | null => {
    try {
      return getAppCommon()?.getVersion() || null;
    } catch (e) {
      console.error('getVersion error:', e);
      return null;
    }
  },

  setScreenSaver: (state: number, onsuccess?: () => void, onerror?: (err: any) => void): void => {
    try {
      getAppCommon()?.setScreenSaver(state, onsuccess, onerror);
    } catch (e) {
      console.error('setScreenSaver error:', e);
    }
  },

  getUuid: (): string | null => {
    try {
      return getAppCommon()?.getUuid() || null;
    } catch (e) {
      console.error('getUuid error:', e);
      return null;
    }
  },

  SCREEN_SAVER_OFF: 0,
  SCREEN_SAVER_ON: 1,
};

export default appcommon;
