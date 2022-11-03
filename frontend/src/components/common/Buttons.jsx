import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
export const BootstrapButton = styled(motion.button)({
  boxShadow: "8px 8px 8px -8px rgb(0 0 0 / 0.2)",
  textTransform: "none",
  fontSize: 18,
  fontWeight: "bold",
  padding: "6px 12px",
  color: "white",
  width: "60%",
  height: "43px",
  margin: "10px",
  border: "none",
  fontFamily: `shsnMedium, sans-serif`,
  backgroundColor: "#57BA83",
  borderRadius: "10px",
});
export const PloggingButtonCrew = styled(motion.button)({
  boxShadow: "8px 8px 8px -8px rgb(0 0 0 / 0.2)",
  textTransform: "none",
  fontSize: 18,
  fontWeight: "bold",
  padding: "6px 12px",
  color: "white",
  width: "100%",
  height: "60px",
  margin: "10px",
  border: "none",
  fontFamily: `shsnMedium, sans-serif`,
  backgroundColor: "#57BA83",
  borderRadius: "10px",
});

export const PloggingButton = styled(motion.button)({
  textTransform: "none",
  backgroundColor: "#fff",
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
  margin: "10px",
  border: "none",
  fontFamily: `shsnMedium, sans-serif`,
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
  fontFamily: `shsnMedium, sans-serif`,
  backgroundColor: "#57BA83",
  borderRadius: "10px",
});

export const PloggingDataButton = styled(motion.button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 12,
  fontWeight: "bold",
  color: "white",
  width: "100px",
  height: "100px",
  border: "none",
  fontFamily: `shsnMedium, sans-serif`,
  margin: "10px",
  backgroundColor: "#57BA83",
});

export const WhiteButton = styled(motion.button)({
  boxShadow: "8px 8px 8px -8px rgb(0 0 0 / 0.2)",
  textTransform: "none",
  border: "1.5px solid #57BA83",
  fontSize: 18,
  fontWeight: "bold",
  padding: "6px 12px",
  color: "#57BA83",
  width: "60%",
  height: "43px",
  margin: "10px",
  fontFamily: `shsnMedium, sans-serif`,
  backgroundColor: "white",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
    color: "#57BA83",
  },
});

export const ContentChooseButton = styled(motion.button)({
  textTransform: "none",
  fontSize: 16,
  fontWeight: "bold",
  padding: "6px 12px",
  color: "black",
  width: "90%",
  height: "43px",
  border: "none",
  margin: "10px",
  fontFamily: `shsnMedium, sans-serif`,
  backgroundColor: "white",
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
