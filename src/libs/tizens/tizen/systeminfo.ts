const getSystemInfo = () => {
  if (typeof window !== 'undefined' && (window as any)?.tizen?.systeminfo) {
    return (window as any).tizen.systeminfo;
  }
  return null;
};

const systeminfo = {
  getVersion: (): string | null => {
    try {
      return getSystemInfo()?.getVersion?.() || null;
    } catch (e) {
      console.error('SystemInfo.getVersion error:', e);
      return null;
    }
  },

  getCapability: (key: string): any => {
    try {
      return getSystemInfo()?.getCapability?.(key);
    } catch (e) {
      console.error('SystemInfo.getCapability error:', e);
      return null;
    }
  },

  getPropertyValue: (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        getSystemInfo()?.getPropertyValue?.(key, resolve, reject);
      } catch (e) {
        console.error('SystemInfo.getPropertyValue error:', e);
        reject(e);
      }
    });
  },

  addPropertyValueChangeListener: (key: string, callback: (value: any) => void, onError?: (err: any) => void): number | null => {
    try {
      return getSystemInfo()?.addPropertyValueChangeListener?.(key, callback, onError) ?? null;
    } catch (e) {
      console.error('SystemInfo.addPropertyValueChangeListener error:', e);
      return null;
    }
  },

  removePropertyValueChangeListener: (listenerId: number): void => {
    try {
      getSystemInfo()?.removePropertyValueChangeListener?.(listenerId);
    } catch (e) {
      console.error('SystemInfo.removePropertyValueChangeListener error:', e);
    }
  },
};

export default systeminfo;
