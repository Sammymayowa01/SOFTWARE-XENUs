"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SectionWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    return (
      <motion.section
        id={idName}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={cn(
          "max-w-7xl mx-auto relative z-0 sm:px-16 px-6 sm:py-16 py-10"
        )}
      >
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
