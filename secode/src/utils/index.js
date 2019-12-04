exports.renderDate = datetime => {
  const fullDate = new Date(datetime);
  const year = fullDate.getFullYear();
  const month =
    fullDate.getMonth() + 1 < 10
      ? "0" + (fullDate.getMonth() + 1)
      : fullDate.getMonth() + 1;
  const date =
    fullDate.getDate() < 10 ? "0" + fullDate.getDate() : fullDate.getDate();

  return `${year}.${month}.${date}`;
};
