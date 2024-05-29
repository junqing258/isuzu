import { loadScript } from "./utils/util";

if (import.meta.env.MODE !== 'production' && typeof window !== 'undefined') {
  if (
    navigator.platform.toLowerCase() !== 'win32' &&
    !/^Mac/i.test(navigator.platform)
  ) {
    loadScript(
      'https://file.40017.cn/usecar/vconsole/3.14.7/vconsole.min.js',
    ).then(() => {
      new (window as any).VConsole();
    });
    // 加载 chii 远程调试工具
    loadScript(location.origin + '/chii/target.js');
  }
} 