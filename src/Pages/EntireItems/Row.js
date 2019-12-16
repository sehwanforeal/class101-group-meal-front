import React from "react";
import { withRouter } from "react-router-dom";

function Row(props) {
  return (
    <div className="table-row">
      <div className="cell">macbook-000122</div>
      <div className="cell">크리에이터셀</div>
      <div className="cell">철이</div>
      <div className="cell">맥북</div>
      <div className="cell">mac-a2312a34</div>
      <div className="cell">개발자용</div>
      <div className="cell">{props.cost.toLocaleString()} 원</div>
      <div
        className="cell bigo"
        onMouseOver={() => props.specHandle(props.idx)}
        onMouseOut={() => props.specHandle(null)}
      >
        RAM : 16GB
        <div className={props.spec === props.idx ? "spec" : "no"}>
          RAM : 16GB , SSD : samsug 1TB, GPU : GTX1080TI
        </div>
      </div>
      <div className="cell">대여중</div>
      <div className="cell last">
        <div
          onClick={() => {
            props.history.push("/modifyitem", props.myObject);
          }}
        >
          수정
        </div>
      </div>
    </div>
  );
}

export default withRouter(Row);

//모델명과 태그 사이에 취득일
