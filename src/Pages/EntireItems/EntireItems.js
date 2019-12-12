import React, { useState } from "react";
import Nav from "Components/Nav";
import something from "Img/something.csv";
import "./EntireItems.scss";
import FirstRow from "./FirstRow";
import Row from "./Row";

function EntireItems() {
  const [selectedSpec, setSelectedSpec] = useState(null);

  const sepcHandler = idx => {
    setSelectedSpec(idx);
  };

  const make = () => {
    let array = [];
    for (let i = 0; i < 70; i++) {
      array.push(
        <Row
          cost={2320020}
          idx={i}
          spec={selectedSpec}
          specHandle={sepcHandler}
        />
      );
    }
    return array;
  };

  const arr = make();
  const img = something;
  console.log(img);
  return (
    <div>
      <Nav />
      <div className="entire-body">
        <div className="article">
          <div className="article-title">
            <span>전체비품</span>
            <div className="title-right">
              <div className="button">
                <a href={img} download>
                  csv로 다운로드
                </a>
              </div>
              <div className="button">새로운 비품 추가</div>
            </div>
          </div>
          <div className="entire-table">
            <FirstRow />
            {/* <div className="table-row">
              <div className="cell">macbook-000122</div>
              <div className="cell">크리에이터셀</div>
              <div className="cell">철이</div>
              <div className="cell">맥북</div>
              <div className="cell">mac-a2312a34</div>
              <div className="cell">개발자용</div>
              <div className="cell">{(213123213).toLocaleString()} 원</div>
              <div
                className="cell bigo"
                onMouseEnter={() => console.log("in!!")}
                onMouseOut={() => console.log("out!!")}
              >
                RAM : 16GB
                <div className="spec">
                  RAM : 16GB <br /> SSD : samsug 1TB <br /> GPU : GTX1080TI
                </div>
              </div>
              <div className="cell">대여중</div>
              <div className="cell last">
                <div>수정</div>
              </div>
            </div> */}
            {arr}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntireItems;
