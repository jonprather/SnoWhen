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
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    ease: easing,
  },
};
//sor tof works but all the children do it which is jank

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
    transition: {
      staggerChildren: 0.3,
    },
  },
};
export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      delay: 0.2,
      ease: "easeIn",
    },
  },
  hide: {
    opacity: 0,

    transition: { duration: 0.2 },
  },
};
export const hover = {
  scale: 1.015,
  transition: {
    duration: 0.225,
  },
};
export const tap = {
  scale: 0.98,
  transition: {
    duration: 0.225,
  },
};
