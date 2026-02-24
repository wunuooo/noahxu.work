import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  // 在组件首次渲染前，通过一个函数同步地获取初始状态，避免闪烁
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => {
      setMatches(media.matches);
    };

    // 监听窗口大小变化
    media.addEventListener('change', listener);

    // 组件卸载时移除监听
    return () => media.removeEventListener('change', listener);
  }, [query]); // 依赖项仅为 query，因为 listener 的闭包会捕获最新的 setMatches

  return matches;
}

export default useMediaQuery;
