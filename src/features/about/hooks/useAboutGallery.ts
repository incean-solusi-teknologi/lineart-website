import { useRef } from 'react';

export function useAboutGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  function scrollGallery(direction: number) {
    const gallery = galleryRef.current;
    const card = gallery?.querySelector('figure');
    if (gallery && card) gallery.scrollBy({ left: direction * (card.offsetWidth + 16) });
  }

  return { galleryRef, scrollGallery };
}
