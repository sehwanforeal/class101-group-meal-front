import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./AddType.scss";

function AddType(props) {
  const [type, setType] = useState(null);
  const [model, setModel] = useState(null);

  const handleInput = (e, t) => {
    t(e.target.value);
  };

  // useEffect(() => {
  //   fetch("http://10.0.1.88:3030/itemType")
  //     .then(res => res.json())
  //     .then(res => {
  //       setRowData(res.itemTypes);
  //     });
  // }, []);
  const sendHttp = () => {
    const data = { itemType: type, itemModel: model };
    fetch("http://10.0.1.88:3030/itemType", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res =>
        res.status === "success"
          ? props.history.push("/assortitems")
          : alert(res)
      );
  };

  return (
    <>
      <Nav />
      <div className="addtype-body">
        <div className="article">
          <div className="article-title">비품 종류 / 모델 추가</div>

          <div className="table-firstrow">
            <div className="cell">비품종류</div>
            <div className="cell second">모델명</div>
          </div>
          <div className="table-firstrow normal-row">
            <div className="cell">
              <input
                onChange={e => {
                  handleInput(e, setType);
                }}
                placeholder="비품종류입력"
              ></input>
            </div>
            <div className="cell second">
              <input
                onChange={e => {
                  handleInput(e, setModel);
                }}
                placeholder="모델명 입력"
              ></input>
            </div>
          </div>
          <div className="article-description">
            종류나 모델이 중복되지 않는지 잘 확인해주세요
          </div>
          <div className="buttons">
            <button
              onClick={() => sendHttp()}
              className={type && model !== null && "button"}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddType;
