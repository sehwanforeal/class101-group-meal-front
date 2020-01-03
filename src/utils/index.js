exports.renderDate = datetime => {
  const fullDate = new Date(datetime);
  const year = String(fullDate.getFullYear()).slice(2);
  const month =
    fullDate.getMonth() + 1 < 10
      ? "0" + (fullDate.getMonth() + 1)
      : fullDate.getMonth() + 1;
  const date =
    fullDate.getDate() < 10 ? "0" + fullDate.getDate() : fullDate.getDate();

  return `${year}.${month}.${date}`;
};

exports.verifyDateString = string => {
  const year = parseInt(string.slice(0, 2));
  const month = parseInt(string.slice(3, 5));
  const date = parseInt(string.slice(6, 8));

  if (string.length !== 8) {
    return false;
  } else if (string[2] !== "." || string[5] !== ".") {
    return false;
  } else if (isNaN(year) || isNaN(month) || isNaN(date)) {
    return false;
  } else {
    return true;
  }
};

exports.convertDateToString = datetime => {
  if (!datetime) {
    return "";
  }
  const date = new Date(datetime);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${year.slice(2)}.${month.length === 1 ? "0" + month : month}.${
    day.length === 1 ? "0" + day : day
  }`;
};
