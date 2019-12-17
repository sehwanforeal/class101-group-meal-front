import React, { useState } from "react";
import sorting from "Img/sorting.jpg";

function FirstRow(props) {
  const [isMinus, setIsMinus] = useState("-");

  return (
    <div className="table-firstrow">
      <div className="cell">
        {!props.sorting && <div />}
        고유번호
        <img
          onClick={() => props.handleSorting("itemType,uniqueNumber")}
          className={props.sorting}
          src={sorting}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        소속
        <img className={props.sorting} src={sorting} alt="" />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        사용자
        <img className={props.sorting} src={sorting} alt="" />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        비품종류
        <img
          onClick={() => props.handleSorting("itemType,uniqueNumber")}
          className={props.sorting}
          src={sorting}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        모델명
        <img
          onClick={() => props.handleSorting("model")}
          className={props.sorting}
          src={sorting}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        취득일
        <img className={props.sorting} src={sorting} alt="" />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        태그
        <img className={props.sorting} src={sorting} alt="" />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        가격
        <img className={props.sorting} src={sorting} alt="" />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        비고
        <img className={props.sorting} src={sorting} alt="" />
      </div>
      <div className="cell status">
        {!props.sorting && <div />}
        상태
        <img className={props.sorting} src={sorting} alt="" />
      </div>
      <div className="cell last"></div>
    </div>
  );
}

export default FirstRow;
