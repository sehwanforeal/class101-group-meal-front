import React, { useState } from "react";
import sortingimg from "Img/sorting.jpg";

function FirstRow(props) {
  const [isMinus, setIsMinus] = useState(null);

  const handleSorting = t => {
    isMinus === null ? setIsMinus("-") : setIsMinus(null);
    props.handleSorting(isMinus === "-" ? isMinus + t : t);
    console.log(isMinus + t);
  };

  return (
    <div className="table-firstrow">
      <div className="cell">
        {!props.sorting && <div />}
        고유번호
        <img
          onClick={() => handleSorting("itemType,uniqueNumber")}
          className={props.sorting}
          src={sortingimg}
          alt=""
        />
      </div>

      <div className="cell">
        {!props.sorting && <div />}
        비품종류
        <img
          onClick={() => handleSorting("itemType,uniqueNumber")}
          className={props.sorting}
          src={sortingimg}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        모델명
        <img
          onClick={() => handleSorting("model")}
          className={props.sorting}
          src={sortingimg}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        취득일
        <img
          onClick={() => handleSorting("acquiredDate")}
          className={props.sorting}
          src={sortingimg}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        태그
        <img
          onClick={() => handleSorting("tags")}
          className={props.sorting}
          src={sortingimg}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        가격
        <img
          onClick={() => handleSorting("price")}
          className={props.sorting}
          src={sortingimg}
          alt=""
        />
      </div>
      <div className="cell">
        {!props.sorting && <div />}
        비고
        <img
          onClick={() => handleSorting("memo")}
          className={props.sorting}
          src={sortingimg}
          alt=""
        />
      </div>

      <div className="cell last"></div>
    </div>
  );
}

export default FirstRow;
