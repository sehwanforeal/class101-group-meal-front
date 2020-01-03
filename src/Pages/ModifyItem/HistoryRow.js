import React from "react";

function HistoryRow(props) {
  const convertDateToString = datetime => {
    const date = new Date(datetime);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${year.slice(2)}.${month.length === 1 ? "0" + month : month}.${
      day.length === 1 ? "0" + day : day
    }`;
  };

  const info = props.info;
  console.log(info);
  return (
    <div className="table-firstrow history-table history-row">
      <div className="cell first">{convertDateToString(info.givenDate)}</div>
      <div className="cell">{info.usageType}</div>
      <div className="cell">
        {info.returnDate && convertDateToString(info.returnDate)}
      </div>
      <div className="cell">{info.memberId.nickName}</div>
      <div className="cell">
        {info.memberId.cell && info.memberId.cell.name}
      </div>
    </div>
  );
}

export default HistoryRow;

const asd = {
  body: {
    item: {
      tag: ["개발자용"],
      price: 234299,
      memo: "hello world",
      usageType: "재고"
    }
  }
};
