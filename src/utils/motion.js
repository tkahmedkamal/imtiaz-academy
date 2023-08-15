export const routeVariants = {
  hidden: {
    marginTop: '50%',
    opacity: 0,
  },
  visible: {
    marginTop: 0,
    opacity: 1,
    transition: { type: 'spring', ease: 'easeIn', stiffness: 100 },
  },
  exit: {
    marginTop: '50%',
    opacity: 0,
    transition: { type: 'spring', mass: 0.4, ease: 'easeInOu', stiffness: 100 },
  },
};

export const filterVariants = {
  hidden: { bottom: '-100vh', scale: 0.5 },
  visible: {
    bottom: 0,
    scale: 1,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
  exit: { bottom: '-100vh', scale: 0.5, transition: { ease: 'easeInOut' } },
};

export const opacityVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { ease: 'easeInOut' } },
};

export const hoverCardVariants = value => {
  return {
    hover: {
      y: value,
      transition: { type: 'spring', mass: 0.4, satisfies: 100 },
    },
  };
};

export const topVariants = (initValue, animateValue, exitValue) => {
  return {
    hidden: {
      opacity: 0,
      top: initValue,
    },
    visible: {
      opacity: 1,
      top: animateValue,
      transition: { type: 'spring', satisfies: 100 },
    },
    exit: {
      opacity: 0,
      top: exitValue,
      transition: { ease: 'easeInOut' },
    },
  };
};

export const rightSideVariants = {
  hidden: {
    right: '-100vh',
  },
  visible: {
    right: 0,
    transition: { type: 'spring', satisfies: 100 },
  },
  exit: {
    right: '-100vh',
    transition: { ease: 'easeInOut' },
  },
};

export const leftSideVariants = {
  hidden: {
    left: '-100vh',
  },
  visible: {
    left: 0,
    transition: { type: 'tween', satisfies: 100 },
  },
  exit: {
    left: '-100vh',
    transition: { ease: 'easeInOut' },
  },
};
