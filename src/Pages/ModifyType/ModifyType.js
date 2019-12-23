import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Nav from "Components/Nav";
import "./ModifyType.scss";
import { url_j, url } from "config";

function ModifyType(props) {
  const [type, setType] = useState(props.location.state.typename);
  const [model, setModel] = useState(props.location.state.itemname);
  const [warning, setWarning] = useState(false);

  const { itemid, typeid } = props.location.state;
  const token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    authorization: token
  };

  const handleInput = (e, t) => {
    t(e.target.value);
  };

  const handleWarning = () => {
    setWarning(warning ? false : true);
  };

  const modifyHttp = () => {
    const data = { itemType: type, itemModel: model };
    fetch(url_j + `itemtype/${typeid}?modelId=${itemid}`, {
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

  const deleteHttp = theUrl => {
    fetch(theUrl, {
      method: "DELETE"
      // headers
    })
      .then(res => res.json())
      .then(res =>
        res.status === "success"
          ? props.history.push("/assortitems")
          : alert("사용중인 비품 종류, 모델명입니다.")
      );
  };

  return (
    <>
      <Nav />
      <div className="modifytype-body">
        <div className="article">
          <div className="article-title">비품 종류 / 모델 수정</div>

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
                value={type}
              ></input>
            </div>
            <div className="cell second">
              <input
                onChange={e => {
                  handleInput(e, setModel);
                }}
                value={model}
              ></input>
            </div>
          </div>
          <div className="article-description">
            종류나 모델이 중복되지 않는지 잘 확인해주세요
          </div>
          <div className="buttons">
            <div>
              <button onClick={() => handleWarning()} className="button redbtn">
                종류삭제
              </button>
              <div className={warning ? "warning" : "norender"}>
                종류삭제시 해당되는 모델도 전부 삭제됩니다{" "}
                <button onClick={() => handleWarning()} className="button">
                  취소
                </button>
                <button
                  onClick={() => deleteHttp(url_j + `itemtype/${typeid}`)}
                  className="button redbtn"
                >
                  삭제
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                deleteHttp(url_j + `itemtype/${typeid}?modelId=${itemid}`)
              }
              className="button redbtn lessred"
            >
              모델삭제
            </button>
            <button onClick={() => modifyHttp()} className="button lastbtn">
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(ModifyType);
