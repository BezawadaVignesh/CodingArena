import { RefObject, useEffect, useRef } from 'react';

const useDarkModeOnScroll = (darkElementsCount: number) => {
  const darkElementsRefs = useRef<RefObject<HTMLDivElement>[]>([...Array(darkElementsCount)].map(() => useRef(null)));

  useEffect(() => {
    const handleScroll = () => {
      const isInDarkMode = darkElementsRefs.current.some(ref => {
        const rect = ref.current?.getBoundingClientRect();
        return rect && rect.top <= window.innerHeight * 0.9 && rect.bottom >= window.innerHeight * 0.75;
      });

      if (isInDarkMode) {
        document.body.classList.add("__dark-mode");
        document.body.style.transition = "1s ease-in-out";
      } else {
        document.body.classList.remove("__dark-mode");
        document.body.style.transition = "0.5s ease-in-out";
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      document.body.classList.remove("__dark-mode");
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return darkElementsRefs;
};

export default useDarkModeOnScroll;
