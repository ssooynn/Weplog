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
