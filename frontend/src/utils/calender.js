export const days = "Mon,Tue,Wed,Thu,Fri,Sat,Sun".split(",");
export const months =
  "Jan,Feb,March,April,May,June,July,August,Sep,Oct,Nov,Dec".split(",");

export const monthYear = (displayInfo) =>
  `${months[displayInfo.month]} ${displayInfo.year}`;

export const monthDays = (displayInfo) =>
  new Date(displayInfo.year, displayInfo.month + 1, 0).getDate();

export const currentMonthDay = (displayInfo, date) => {
  const currentDate = new Date();
  return (
    currentDate.getDate() === date &&
    currentDate.getFullYear() === displayInfo.year &&
    currentDate.getMonth() === displayInfo.month
  );
};

export const selectDay = (year, month, day) => {
  return year + "년 " + month + "월 " + day + "일";
};

export const monthDayStart = (displayInfo) =>
  new Date(displayInfo.year, displayInfo.month, 0).getDay();
