import React from "react";
import { convertDateToString } from "utils";
import { withRouter } from "react-router-dom";
import { url_j, url } from "config";

function Row(props) {
  const info = props.info;
  return (
    <div className="table-row">
      <div className="cell">
        {info.itemType.name}_{info.uniqueNumberForClient}
      </div>
      <div className="cell">
        {info.owner && info.owner.cell && info.owner.cell.name}
      </div>
      <div className="cell">{info.owner && info.owner.nickName}</div>
      <div className="cell">{info.itemType.name}</div>
      <div className="cell">{info.model.name || ""}</div>
      <div className="cell">{convertDateToString(info.acquiredDate)}</div>
      <div className="cell">
        {info.tags.map((el, i) => {
          return (
            <span>
              {i !== 0 && <span>,</span>}
              {el}
            </span>
          );
        })}
      </div>
      <div className="cell">{info.price.toLocaleString()} 원</div>
      <div className="cell bigo">
        {info.memo}
        <div className={props.spec === props.idx ? "spec" : "no"}>
          {info.memo}
        </div>
      </div>
      <div className="cell">{info.usageType}</div>
      <div className="cell last">
        <div
          onClick={() => {
            props.history.push("/modifyitem", info);
          }}
        >
          수정
        </div>
        <div onClick={() => props.handleReturn(info.id)}>반납</div>
      </div>
    </div>
  );
}

export default withRouter(Row);

//모델명과 태그 사이에 취득일
