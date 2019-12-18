import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Nav from "Components/Nav";
import "./ModifyItem.scss";
import FirstRow from "Pages/EntireItems/FirstRow";
import HistoryRow from "./HistoryRow";

function ModifyItem(props) {
  const [data, setData] = useState(null);
  const [spec, setSpec] = useState(false);
  const [acquiredDate, setDate] = useState(props.location.state.date);
  const [tag, setTag] = useState(props.location.state.tag);
  const [price, setPrice] = useState(props.location.state.price);
  const [memo, setBigo] = useState(props.location.state.memo);
  const [usageType, setStatus] = useState(props.location.state.usageType);
  const [areyousure, setAreyousure] = useState(false);

  const info = props.location.state;
  const itemID = info.id;
  console.log(info.isArchived);
  useEffect(() => {
    console.log("didMount");
    fetch(`http://10.0.6.233:3030/item/${itemID}`)
      .then(res => res.json())
      .then(res => setData(res.message));
  }, [itemID]);

  const handlePatch = () => {
    const body = {
      item: {
        tag,
        price,
        memo,
        usageType
      }
    };
    fetch(`http://10.0.6.233:3030/item/${itemID}`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        const { tag, price, memo, usageType } = res.message;
        setTag(tag);
        setPrice(price);
        setBigo(memo);
        setStatus(usageType);
        console.log(res);
      });
  };

  const specHandle = b => {
    b ? setSpec(true) : setSpec(false);
  };

  const handleInput = (e, t) => {
    t(e.target.value);
  };

  const toggleSure = () => {
    setAreyousure(areyousure ? false : true);
  };

  const handleWaste = () => {
    const body = {
      item: { isArchived: true }
    };
    fetch(`http://10.0.6.233:3030/item/${itemID}`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "success") {
          props.history.push("/entireitems");
        }
      });
  };

  const handleUnWaste = () => {
    const body = {
      item: { isArchived: false }
    };
    fetch(`http://10.0.6.233:3030/item/${itemID}`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "success") {
          props.history.push("/entireitems");
        }
      });
  };

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
                value={acquiredDate}
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
                // type="number"
                value={price}
              ></input>
              원
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
                  value={memo}
                ></textarea>
              </div>
            </div>
            <div className="cell status change">
              <select onChange={e => handleInput(e, setStatus)}>
                {usageType === "재고" ? (
                  <option value="재고">재고</option>
                ) : (
                  <>
                    <option value={usageType}>{usageType}</option>
                    <option value={usageType === "대여" ? "지급" : "대여"}>
                      {usageType === "대여" ? "지급" : "대여"}
                    </option>
                  </>
                )}
              </select>
            </div>
            <div className="cell last" />
          </div>
          <div className="actions">
            <div className="action-left">
              {info.isArchived ? (
                <button onClick={() => handleUnWaste()} className="disposal">
                  복구하기
                </button>
              ) : (
                <button onClick={() => handleWaste()} className="disposal">
                  폐기하기
                </button>
              )}

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
            <button onClick={() => handlePatch()} className="save">
              저장하기
            </button>
          </div>
          <div className="history-title">지급/반납 히스토리</div>
          <div className="table-firstrow history-table">
            <div className="cell first">지급/ 대여 날짜</div>
            <div className="cell">지급/대여</div>
            <div className="cell">반납날짜</div>
            <div className="cell">사용자</div>
            <div className="cell final">소속 셀</div>
          </div>
          {data &&
            data.provisionHistory.map(el => {
              return <HistoryRow info={el} />;
            })}
          {/* <HistoryRow /> */}
        </div>
      </div>
    </>
  );
}

export default withRouter(ModifyItem);
