export const getAge = birthday => {
  if (birthday) {
    const ageDate = new Date(Date.now() - new Date(birthday).getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  return "";
};

export const getDate = time => {
  if (!time) return "";
  let timeString = new Date(time).toString();
  timeString = timeString.slice(0, timeString.length - 42);
  return timeString;
};

export const getTime = time => {
  if (!time) return "";
  let timeString = new Date(time).toString();
  timeString = timeString.slice(0, timeString.length - 33);
  return timeString;
};

export const getYear = year => {
  if (year) return new Date(year).getFullYear();
  return "";
};

export const checkFromTo = (from, to) => {
  if (new Date(from).getTime() - new Date(to).getTime() > 0) return true;
  return false;
};
