export const util = () => {};

export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const timeToString = (time) => {
  if (time < 60) return `00:${time < 10 ? "0" + time : time}`;
  else if (time < 3600) {
    let minute = parseInt(time / 60);
    let second = time - minute * 60;
    return `${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`;
  } else {
    let hour = parseInt(time / 3600);
    let minute = time - hour * 3600;
    return `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }`;
  }
};
