"use client";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const TrashIcon = forwardRef((
  { className, size = 24, duration = 1, isAnimated = true },
  ref
) => {

  const controls = useAnimation();
  const reduced = useReducedMotion();
  const isControlled = useRef(false);

  useImperativeHandle(ref, () => ({
    startAnimation: () =>
      reduced ? controls.start("normal") : controls.start("animate"),
    stopAnimation: () => controls.start("normal"),
  }));

  const handleEnter = () => {
    if (!isAnimated || reduced) return;
    controls.start("animate");
  };

  const handleLeave = () => controls.start("normal");

  const iconVariants = {
    normal: { scale: 1 },
    animate: { scale: [1, 1.05, 1] },
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className ?? ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={iconVariants}
        animate={controls}
        initial="normal"
      >
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </motion.svg>
    </motion.div>
  );
});

TrashIcon.displayName = "TrashIcon";
export { TrashIcon };
