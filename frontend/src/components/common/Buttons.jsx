import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
export const BootstrapButton = styled(motion.button)({
  boxShadow: "4px 4px 4px -4px rgb(0 0 0 / 0.2)",
  textTransform: "none",
  fontSize: 18,
  fontWeight: "bold",
  padding: "6px 12px",
  color: "white",
  width: "60%",
  height: "43px",
  margin: "10px",
  border: "none",
  fontFamily: `gwtt, sans-serif`,
  backgroundColor: "#57BA83",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#57BA83",
    boxShadow: "none",
    color: "white",
  },
});

export const RegisterButton = styled(motion.button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 18,
  fontFamily: "gwtt",
  fontWeight: "bold",
  padding: "6px 12px",
  color: "white",
  width: "75%",
  height: "5vh",
  border: "none",
  margin: "10px",
  borderRadius: "10px",
  backgroundColor: "#57BA83",
  "&:hover": {
    backgroundColor: "#57BA83",
    boxShadow: "none",
    color: "white",
  },
});

export const PauseButton = styled(motion.button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  fontWeight: "bold",
  padding: "6px 12px",
  color: "white",
  width: "50%",
  height: "5vh",
  border: "none",
  margin: "10px",
  backgroundColor: "#57BA83",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#57BA83",
    boxShadow: "none",
    color: "white",
  },
});

export const WhiteButton = styled(motion.button)({
  boxShadow: "none",
  textTransform: "none",
  border: "1px solid #57BA83",
  fontSize: 14,
  fontFamily: "gwmd",
  fontWeight: "bold",
  padding: "6px 12px",
  color: "#64CCBE",
  width: "50%",
  height: "5vh",
  margin: "10px",
  backgroundColor: "white",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
    color: "#57BA83",
  },
});

export const ExitButton = styled(motion.button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  fontWeight: "bold",
  padding: "6px 12px",
  color: "white",
  width: "50%",
  border: "none",
  height: "5vh",
  margin: "10px",
  backgroundColor: "#F29393",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#F29393",
    boxShadow: "none",
    color: "white",
  },
});
