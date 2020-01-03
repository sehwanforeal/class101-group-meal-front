import React, { useState, useEffect } from "react";
import { url_j, url } from "config";
import Nav from "Components/Nav";
import "./AddType.scss";

function AddType(props) {
  const [type, setType] = useState(null);
  const [model, setModel] = useState(null);

  const handleInput = (e, t) => {
    t(e.target.value);
  };

  const sendHttp = () => {
    const data = { itemType: type, itemModel: model };
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    fetch(url_j + "itemtype", {
      method: "post",
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res =>
        res.status === "success"
          ? props.history.push("/assortitems")
          : alert("중복된 모델명입니다.")
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
