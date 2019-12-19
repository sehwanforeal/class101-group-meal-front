import React, { useEffect, useState } from "react";
import Nav from "Components/Nav";
import "./WastedItems.scss";
import TableRow from "./TableRow";

function WastedItems(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://10.0.7.163:3030/item?isArchived=true")
      .then(res => res.json())
      .then(res => setData(res.message));
  }, []);

  console.log(data);

  return (
    <div>
      <Nav />
      <div className="wasted-body">
        <div className="article">
          <div className="article-title">폐기한 비품</div>
          <div className="table-firstrow">
            <div className="cell">고유번호</div>
            <div className="cell">비품종류</div>
            <div className="cell">모델명</div>
            <div className="cell">태그</div>
            <div className="cell">가격</div>
            <div className="cell status">비고</div>
            <div className="cell last"></div>
          </div>
          {data &&
            data.map(el => {
              return <TableRow info={el} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default WastedItems;
