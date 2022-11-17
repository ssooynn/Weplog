import { ReactComponent as Success } from "../assets/icons/success.svg";
import { ReactComponent as Fail } from "../assets/icons/fail.svg";

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
  if (time < 60) return `00:00:${time < 10 ? "0" + time : time}`;
  else if (time < 3600) {
    let minute = parseInt(time / 60);
    let second = time - minute * 60;
    return `00:${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`;
  } else {
    let hour = parseInt(time / 3600);
    let minute = parseInt((time - hour * 3600) / 60);
    let second = parseInt(time - hour * 3600 - minute * 60);
    return `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }:${second < 10 ? "0" + second : second}`;
  }
};

export const calcCalories = (time, weight) => {
  return parseInt((8.5 * (3.5 * weight * parseFloat(time / 60.0)) * 5) / 1000);
};

export const calcDistance = (distance) => {
  return parseFloat(distance / 1000).toFixed(2);
};

// 두 좌표간 거리 계산
export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  d = Math.round(d * 1000);
  return d;
};

// 각도를 라디안으로 변환
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// 거리에 따라 카카오맵의 레벨을 설정
export const calcMapLevel = (distance) => {
  return Math.ceil(Math.log((2 * distance) / 125) / Math.log(2));
};

export const GrommetTheme = {
  notification: {
    toast: {
      time: 500,
      container: {
        width: "long",
      },
    },
    normal: {
      toast: {
        background: {
          color: "white",
          opacity: "strong",
        },
      },
      icon: () => <Success />,
    },
    critical: {
      toast: {
        background: {
          color: "white",
          opacity: "strong",
        },
      },
      icon: () => <Fail />,
    },
    info: {
      toast: {
        time: 3000,
        container: {
          width: "long",
        },
        background: {
          color: "white",
          opacity: "strong",
        },
      },
      icon: () => <Success />,
    },
  },
  carousel: {
    animation: {
      duration: 300,
    },
  },
};

export const petList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const plomonList = [
  { index: 1, name: "피스" },
  { index: 2, name: "로에" },
  { index: 3, name: "라바" },
  { index: 4, name: "슈타" },
  { index: 5, name: "요거" },
  { index: 6, name: "레이" },
  { index: 7, name: "레오" },
  { index: 8, name: "바나" },
  { index: 9, name: "마크" },
  { index: 10, name: "라프" },
  { index: 11, name: "키치" },
  { index: 12, name: "재권" },
];

export const plomonSelector = (index) => {
  console.log(index);
  return plomonList.find((p) => p.index === index).name;
};

export const dateToString = (text) => {
  const date = new Date(text);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return year + "년 " + month + "월 " + day + "일";
};

export const dateToDetailString = (text) => {
  const date = new Date(text);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return (
    year + "년 " + month + "월 " + day + "일 " + hour + "시 " + minute + "분"
  );
};

export const httpToHttps = (url) => {
  // console.log(url.split("://")[0], url.split("://")[1]);
  if (url.split("://")[0] !== "http") return url;
  return url.split("://")[0] + "s://" + url.split("://")[1];
};

export const convertStringToColor = (color) => {
  if (color === "RED") return "#FF0000";
  if (color === "YELLOW") return "#FFFF00";
  if (color === "BLUE") return "#0000FF";
  if (color === "GREEN") return "#008000";
  if (color === "PURPLE") return "#800080";
  if (color === "ORANGE") return "#FFA500";
  if (color === "PINK") return "#FFC0CB";
  if (color === "BROWN") return "#A52A2A";
  if (color === "AQUAMARINE") return "#7FFFD4";
  if (color === "GRAY") return "#808080";
};
