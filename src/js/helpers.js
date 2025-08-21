import { refs } from './refs';

export const scrollToTop = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      refs.scrollToTopBtn.classList.add('scroll-top-btn--visible');
    } else {
      refs.scrollToTopBtn.classList.remove('scroll-top-btn--visible');
    }
  });

  refs.scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};
