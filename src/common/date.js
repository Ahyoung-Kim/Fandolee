import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const timestampToDateFormat = (timestamp) => {
  const date = timestamp.toDate();

  return dateFormat(date);
};

export const timestampToDate = (timestamp) => {
  const date = timestamp.toDate();
  return date;
};

export const remainDate = (timestamp) => {
  const endDate = timestamp.toDate();
  const today = new Date();

  const diffMSec = endDate.getTime() - today.getTime();
  let diffDate = diffMSec / (24 * 60 * 60 * 1000);

  diffDate = Math.floor(diffDate);
  // console.log("diffDate: ", diffDate);

  return diffDate;
};

export const timestampToDateTimeFormat = (timestamp) => {
  const date = new Date(timestamp);
  return moment(date).format("YYYY-MM-DD HH:mm");
};
