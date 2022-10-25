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
        textAlign: "center",
        height: "calc(94vh - 50px)",
      }}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      hi
    </motion.div>
  );
};
