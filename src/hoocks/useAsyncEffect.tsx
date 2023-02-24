import { useEffect } from 'react';

function useAsyncEffect(
  effect: () => Promise<void> | void,
  destroy?: any[] | (() => void),
  dependencies?: any[],
) {
  const hasDestroy = typeof destroy === 'function';
  useEffect(
    function () {
      effect();
      return hasDestroy ? destroy : undefined;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hasDestroy ? dependencies : destroy,
  );
}

export default useAsyncEffect;
