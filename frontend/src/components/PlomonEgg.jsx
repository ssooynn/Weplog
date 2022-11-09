import { motion } from "framer-motion";
import { Box } from "grommet";
import React from "react";
import Check from "../assets/images/select.png";
export const PlomonEgg = ({ egg, isActive, onClick }) => {
  return (
    <Box align="center" justify="end" height="150px">
      {isActive && (
        <motion.img
          src={Check}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
      <motion.img
        transition={{ duration: 0.15 }}
        animate={{
          height: isActive ? "100px" : "80px",
          width: isActive ? "100px" : "80px",
        }}
        onClick={onClick}
        src={`/assets/images/egg${egg}.png`}
      />
    </Box>
  );
};
