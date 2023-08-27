import { motion } from "framer-motion";
import React from "react";

const LoadingDot = {
  display: "block",
  width: "1.5rem",
  height: "1.5rem",
  backgroundColor: "black",
  borderRadius: "50%"
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition0 = {
  duration: 1, 
  repeat: Infinity,
  ease: 'easeInOut'
};
const DotTransition1 = {
  delay: .4,
  duration: 1, 
  repeat: Infinity,
  ease: 'easeInOut'
};
const DotTransition2 = {
  delay: .8,
  duration: 1, 
  repeat: Infinity,
  ease: 'easeInOut'
};

export default function ThreeDotsWave() {
  return (
    <div className="pr-[5%]">
      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
          <motion.span
          
            animate={{ y: [0, -20, 0] }}
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition0}
          />
          <motion.span
            animate={{ y: [0, -20, 0] }}
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition1}
          />
          <motion.span
            animate={{ y: [0, -20, 0] }}
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition2}
          />
        
      </div>
    </div>

  );
}
