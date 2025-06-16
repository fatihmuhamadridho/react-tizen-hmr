const getAdInfo = () => {
  if (typeof window !== 'undefined' && (window as any)?.webapis?.adinfo) {
    return (window as any).webapis.adinfo;
  }
  return null;
};

const getVersion = (): string | null => {
  try {
    return getAdInfo()?.getVersion() || null;
  } catch (e) {
    console.error('getVersion error:', e);
    return null;
  }
};

const getTIFA = (): string | null => {
  try {
    return getAdInfo()?.getTIFA() || null;
  } catch (e) {
    console.error('getTIFA error:', e);
    return null;
  }
};

const isLATEnabled = (): boolean | null => {
  try {
    return getAdInfo()?.isLATEnabled() ?? null;
  } catch (e) {
    console.error('isLATEnabled error:', e);
    return null;
  }
};

const adinfo = {
  getVersion,
  getTIFA,
  isLATEnabled,
};

export default adinfo;
