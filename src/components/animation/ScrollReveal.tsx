"use client"
import { motion } from "motion/react";
import revealVariants from "./variants";

interface TypeProps {
  className?: string;
  children: React.ReactNode;
  variant?: keyof typeof revealVariants;
  controlledByParent?: boolean;
}

const ScrollReveal = (props: TypeProps) => {
  const {
    children,
    className,
    variant = "membesar",
    controlledByParent = false
  } = props;

  return (
    <motion.div
      className={className}
      variants={revealVariants[variant]}
      initial={controlledByParent ? undefined : "hidden"}
      whileInView={controlledByParent ? undefined : "visible"}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      viewport={{
        once: true,
        amount: 0.2
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal;