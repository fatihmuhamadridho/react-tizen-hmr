const getAvInfo = () => {
  if (typeof window !== 'undefined' && (window as any)?.webapis?.avinfo) {
    return (window as any).webapis.avinfo;
  }
  return null;
};

const avinfo = {
  getVersion: (): string | null => {
    try {
      return getAvInfo()?.getVersion?.() || null;
    } catch (e) {
      console.error('AvInfo.getVersion error:', e);
      return null;
    }
  },

  getDolbyDigitalCompMode: (): string | null => {
    try {
      return getAvInfo()?.getDolbyDigitalCompMode?.() || null;
    } catch (e) {
      console.error('AvInfo.getDolbyDigitalCompMode error:', e);
      return null;
    }
  },

  isHdrTvSupport: (): boolean => {
    try {
      return getAvInfo()?.isHdrTvSupport?.() ?? false;
    } catch (e) {
      console.error('AvInfo.isHdrTvSupport error:', e);
      return false;
    }
  },

  setSubAmpMode: (mode: 'NO_EXT_AUDIO' | 'EXT_AUDIO_TV' | 'EXT_AUDIO_SWITCH' | 'EXT_HEALTHCARE'): void => {
    try {
      getAvInfo()?.setSubAmpMode(mode);
    } catch (e) {
      console.error('AvInfo.setSubAmpMode error:', e);
    }
  },

  getEnergySaving: (): 'OFF' | 'LOW' | 'MEDIUM' | 'HIGH' | null => {
    try {
      return getAvInfo()?.getEnergySaving?.() || null;
    } catch (e) {
      console.error('AvInfo.getEnergySaving error:', e);
      return null;
    }
  },

  setEnergySaving: (value: 'OFF' | 'LOW' | 'MEDIUM' | 'HIGH'): void => {
    try {
      getAvInfo()?.setEnergySaving(value);
    } catch (e) {
      console.error('AvInfo.setEnergySaving error:', e);
    }
  },

  getEcoSensor: (): 'OFF' | 'ON' | null => {
    try {
      return getAvInfo()?.getEcoSensor?.() || null;
    } catch (e) {
      console.error('AvInfo.getEcoSensor error:', e);
      return null;
    }
  },

  setEcoSensor: (value: 'OFF' | 'ON'): void => {
    try {
      getAvInfo()?.setEcoSensor(value);
    } catch (e) {
      console.error('AvInfo.setEcoSensor error:', e);
    }
  },
};

export default avinfo;
