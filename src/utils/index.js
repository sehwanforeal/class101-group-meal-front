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
