const getAllShare = () => {
  if (typeof window !== 'undefined' && (window as any)?.webapis?.allshare) {
    return (window as any).webapis.allshare;
  }
  return null;
};

const asfservice = {
  getVersion: (): string | null => {
    try {
      return getAllShare()?.getVersion?.() || null;
    } catch (e) {
      console.error('ASFService.getVersion error:', e);
      return null;
    }
  },

  createServiceProvider: (onsuccess?: (provider: any) => void, onerror?: (error: any, state: any) => void): void => {
    try {
      getAllShare()?.serviceconnector?.createServiceProvider(onsuccess, onerror);
    } catch (e) {
      console.error('ASFService.createServiceProvider error:', e);
    }
  },

  deleteServiceProvider: (onsuccess?: () => void, onerror?: (error: any, state: any) => void): void => {
    try {
      getAllShare()?.serviceconnector?.deleteServiceProvider(onsuccess, onerror);
    } catch (e) {
      console.error('ASFService.deleteServiceProvider error:', e);
    }
  },

  getServiceProvider: (): any | null => {
    try {
      return getAllShare()?.serviceconnector?.getServiceProvider() || null;
    } catch (e) {
      console.error('ASFService.getServiceProvider error:', e);
      return null;
    }
  },
};

export default asfservice;
