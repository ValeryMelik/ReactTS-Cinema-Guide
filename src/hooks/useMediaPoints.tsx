import { useState, useEffect } from 'react';

const checkWindowIsMobile = (): boolean => {
  return window.innerWidth <= 768;
};
const checkWindowIsTablet = (): boolean => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};
const checkWindowIsDesktop = (): boolean => {
  return window.innerWidth > 1024;
};

interface IUseMediaPoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useMediaPoints = (): IUseMediaPoints => {
  const [isMobile, setIsMobile] = useState<boolean>(checkWindowIsMobile());
  const [isTablet, setIsTablet] = useState<boolean>(checkWindowIsTablet());
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkWindowIsMobile());
      setIsTablet(checkWindowIsTablet());
      setIsDesktop(checkWindowIsDesktop());
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useMediaPoints;
