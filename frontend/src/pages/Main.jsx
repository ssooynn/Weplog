import React from "react";
import { motion } from "framer-motion";
export const Main = () => {
  return (
    <motion.div
      style={{
        width: "100%",
        justify: "center",
        background: "#fffff",
      }}
      initial="hidden"
      animate="visible"
    >
      hi
    </motion.div>
  );
};
