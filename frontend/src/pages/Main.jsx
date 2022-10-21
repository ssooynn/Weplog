import React from "react";
import { motion } from "framer-motion";
import { container } from "../utils/util";
export const Main = () => {
  return (
    <motion.div
      style={{
        width: "100%",
        justify: "center",
        background: "#fffff",
        height: "120vh",
      }}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      hi
    </motion.div>
  );
};
