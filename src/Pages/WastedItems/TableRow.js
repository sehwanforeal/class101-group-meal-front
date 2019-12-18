import React from "react";

function TableRow(props) {
  return (
    <div className="table-row">
      <div className="cell">macbook-0009</div>
      <div className="cell">맥북</div>
      <div className="cell">mac-a341342</div>
      <div className="cell">개발자용</div>
      <div className="cell">{(2032300).toLocaleString()}원</div>
      <div className="cell status">RAM : 16GB</div>
      <div className="cell last">
        <button>수정</button>
      </div>
    </div>
  );
}

export default TableRow;
