import React, { useState, createRef } from "react";
import { renderDate, verifyDateString } from "utils";
import { url_j, url } from "config";

const defaultDate = renderDate(Date.now());

function Modal(props) {
  const { onClick, itemId } = props;

  const [isWrongDate, setWrongDate] = useState(false);
  const [modalOff, setModal] = useState(false);
  const [givenDate, setGivenDate] = useState(defaultDate);
  const [memberName, setMemberName] = useState("");
  const card = createRef();

  const token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    authorization: token
  };

  const handleClickCancel = () => {
    onClick();
  };

  const handleClickBg = e => {
    e.target.contains(card.current) && onClick();
  };

  const handleChange = e => {
    const value = e.target.value;
    setGivenDate(value);

    if (!verifyDateString(value)) {
      setWrongDate(true);
    } else {
      setWrongDate(false);
    }
  };

  const handleClickConfirm = async e => {
    // isWrongDate 가 false 라면 반납 fetch
    const usageType = e.target.textContent;
    const data = { givenDate, memberName, usageType };

    if (!isWrongDate) {
      const response = await fetch(`${url_j}provision/${itemId}`, {
        headers,
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          // res.status === "success"
          //   ? onClick()
          //   : alert("이름이 올바르지 않습니다");

          if (res.status === "success") {
            onClick();
          } else {
            alert("이름이 올바르지 않습니다");
          }
        });

      // response의 메시지에 따라 결과를 다르게 해야함. 예를 들어 존재하지 않는 사용자 이름일 경우, 사용자 이름을 확인하세요 같은 메시지를 띄워야 함.
      // response.status === "success" && onClick();
    }
  };

  const handleMemberName = e => {
    const value = e.target.value;

    setMemberName(value);
  };

  return (
    <div className="modal">
      <div onClick={handleClickBg} className="background" ref={card}>
        <div className="card">
          <span onClick={handleClickCancel} className="cancel"></span>
          <div className="row">
            <div className="key">사용자</div>
            <input
              onChange={handleMemberName}
              value={memberName}
              className="value"
            />
          </div>
          <div className="row">
            <div className="key">지급일</div>
            <input
              name="enrolledIn"
              onChange={handleChange}
              value={givenDate}
              className={isWrongDate ? "wrong" : "value"}
            />
          </div>
          <div className="button-wrapper">
            <button onClick={handleClickConfirm} className="change">
              지급
            </button>
            <button onClick={handleClickConfirm} className="change">
              대여
            </button>
            <button onClick={handleClickCancel} className="delete">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
