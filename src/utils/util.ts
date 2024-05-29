export const loadScript = (src: string, opts?: any) => {
  if (typeof window === 'undefined') return Promise.reject();
  if (typeof opts !== 'object') opts = Object.create(null);
  return new Promise<void>((resolve, reject) => {
    if (opts.id && document.getElementById(opts.id)) {
      return resolve();
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => setTimeout(resolve);
    script.onerror = reject;
    script.src = src;
    Object.assign(script, opts);
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};