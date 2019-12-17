import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./ModifyItem.scss";
import FirstRow from "Pages/EntireItems/FirstRow";
import HistoryRow from "./HistoryRow";

function ModifyItem(props) {
  const [data, setData] = useState(null);
  const [spec, setSpec] = useState(false);
  const [date, setDate] = useState(props.location.state.date);
  const [tag, setTag] = useState(props.location.state.tag);
  const [price, setPrice] = useState(props.location.state.price);
  const [bigo, setBigo] = useState(props.location.state.memo);
  const [status, setStatus] = useState(props.location.state.usageType);
  const [areyousure, setAreyousure] = useState(false);

  const info = props.location.state;

  useEffect(() => {
    console.log("didMount");
    fetch(`http://10.0.4.124:3030/item/${info.id}`)
      .then(res => res.json())
      .then(res => setData(res.message));
  }, [info.id]);

  console.log(tag);

  const specHandle = b => {
    b ? setSpec(true) : setSpec(false);
  };

  const handleInput = (e, t) => {
    t(e.target.value);
  };

  const toggleSure = () => {
    setAreyousure(areyousure ? false : true);
  };
  console.log(status);

  return (
    <>
      <Nav />
      <div className="modify-body">
        <div className="article">
          <div className="title">비품 수정</div>
          <FirstRow sorting={"none"} />
          <div className="table-row">
            <div className="cell">
              {info.itemType.name}_{info.uniqueNumberForCilent}
            </div>
            <div className="cell">없음</div>
            <div className="cell">{info.owner}</div>
            <div className="cell">{info.itemType.name}</div>
            <div className="cell">{info.model.name}</div>
            <div className="cell change">
              <input
                onChange={e => handleInput(e, setDate)}
                type="text"
                value={date}
              ></input>
            </div>
            <div className="cell change">
              <input
                onChange={e => handleInput(e, setTag)}
                type="text"
                value={tag}
              ></input>
            </div>
            <div className="cell change">
              <input
                onChange={e => handleInput(e, setPrice)}
                type="text"
                value={price && price.toLocaleString() + "원"}
              ></input>
            </div>
            <div
              className="cell bigo change"
              onMouseOver={() => specHandle(true)}
              onMouseOut={() => specHandle(false)}
            >
              비고확인
              <div className={spec ? "spec" : "no"}>
                <textarea
                  onChange={e => handleInput(e, setBigo)}
                  type="text"
                  value={bigo}
                ></textarea>
              </div>
            </div>
            <div className="cell status change">
              <select value={status} onChange={e => handleInput(e, setStatus)}>
                <option value="대여">대여</option>
                <option value="지급">지급</option>
                <option value="지급">재고</option>
              </select>
            </div>
            <div className="cell last" />
          </div>
          <div className="actions">
            <div className="action-left">
              <button className="disposal">폐기하기</button>
              <button onClick={() => toggleSure()} className="delete">
                삭제하기
              </button>
              <div className={areyousure ? "areyousure" : "norender"}>
                정말로 삭제하시겠습니까?
                <button onClick={() => toggleSure()} className="cancle">
                  취소
                </button>
                <button className="sure">정말로 삭제</button>
              </div>
            </div>
            <button className="save">저장하기</button>
          </div>
          <div className="history-title">지급/반납 히스토리</div>
          <div className="table-firstrow history-table">
            <div className="cell first">지급/ 대여 날짜</div>
            <div className="cell">반납날짜</div>
            <div className="cell">사용자</div>
            <div className="cell final">소속 셀</div>
          </div>
          <HistoryRow />
        </div>
      </div>
    </>
  );
}

export default ModifyItem;
