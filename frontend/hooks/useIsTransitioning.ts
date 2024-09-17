import { useEffect, useState } from 'react';

const useIsTransitioning = (): boolean => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsTransitioning(body.classList.contains('page-is-transitioning'));
        }
      });
    });

    observer.observe(body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return isTransitioning;
};

export default useIsTransitioning;