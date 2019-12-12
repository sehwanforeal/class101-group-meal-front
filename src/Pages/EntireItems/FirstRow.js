import React from "react";
import sorting from "Img/sorting.jpg";

function FirstRow() {
  return (
    <div className="table-firstrow">
      <div className="cell">
        <div />
        고유번호
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        소속
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        사용자
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        비품종류
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        모델명
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        태그
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        가격
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        비고
        <img src={sorting} alt="" />
      </div>
      <div className="cell">
        <div />
        상태
        <img src={sorting} alt="" />
      </div>
      <div className="cell last"></div>
    </div>
  );
}

export default FirstRow;
