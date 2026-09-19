import type { Transition, Variants } from 'framer-motion';

/**
 * BENGALA Editorial Motion System
 * Inspired by Aman & Six Senses: calm, weighted, intentional.
 * Avoids disorienting 3D skews, respects reduced motion.
 */

// Primary luxury easing curve: smooth entry with long, refined deceleration
export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Snappy micro-interaction easing for buttons and icons
export const SNAPPY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const TRANSITION_LUXURY: Transition = {
  duration: 0.7,
  ease: LUXURY_EASE,
};

export const TRANSITION_FAST: Transition = {
  duration: 0.3,
  ease: SNAPPY_EASE,
};

export const TRANSITION_KEN_BURNS: Transition = {
  duration: 12,
  ease: 'linear',
};

export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_LUXURY,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: TRANSITION_FAST,
  },
};

export const MODAL_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: TRANSITION_LUXURY,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 10,
    transition: TRANSITION_FAST,
  },
};
