export const easing = [0.6, -0.05, 0.01, 0.99];
export const fadeInRight = {
  initial: {
    x: 600,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -600,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    ease: easing,
  },
};
//sor tof works but all the children do it which is jank
export const containerScale = {
  initial: {
    x: 600,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    // x: -600,
    // scale: 15,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    ease: easing,
  },
};
export const fadeInBottom = {
  initial: {
    y: 600,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    ease: easing,
  },
};

export const stagger = {
  animate: {
    scale: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};
