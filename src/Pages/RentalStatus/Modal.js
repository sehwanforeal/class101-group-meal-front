import React, { useState, createRef, useEffect } from "react";
import { renderDate, verifyDateString, convertDateToString } from "utils";
import { url_j, url } from "config";

const defaultDate = renderDate(Date.now());

function Modal(props) {
  const { onClick, givenDate, memberName, itemId } = props;
  const [isWrongDate, setWrongDate] = useState(false);
  const [modalOff, setModal] = useState(false);
  const [returnDateVal, setReturnDate] = useState(defaultDate);
  const [itemData, setItemData] = useState(null);
  const card = createRef();

  const token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    authorization: token
  };

  useEffect(() => {
    console.log("mount");
    const id = itemId;
    fetch(url_j + "provision/" + id, { headers })
      .then(res => res.json())
      .then(res => setItemData(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  console.log(itemData);

  const handleClickCancel = () => {
    onClick();
  };

  const handleClickBg = e => {
    e.target.contains(card.current) && onClick();
  };

  const handleChange = e => {
    const value = e.target.value;
    setReturnDate(value);

    if (!verifyDateString(value)) {
      setWrongDate(true);
    } else {
      setWrongDate(false);
    }
  };

  const handleClickConfirm = async () => {
    // isWrongDate 가 false 라면 반납 fetch
    const data = { returnDate: returnDateVal };

    if (!isWrongDate) {
      const response = await fetch(`${url_j}provision/${itemId}`, {
        headers,
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          res.status === "success" && onClick();
        });
    }
  };

  return (
    <div className="modal">
      <div onClick={handleClickBg} className="background" ref={card}>
        <div className="card">
          <span onClick={handleClickCancel} className="cancel"></span>
          <div className="row">
            <div className="key">사용자</div>
            <input value={itemData && itemData.owner} className="value" />
          </div>
          <div className="row">
            <div className="key">지급일</div>
            <input
              value={itemData && convertDateToString(itemData.givenDate)}
              className={"value"}
            />
          </div>
          <div className="row">
            <div className="key">반납일</div>
            <input
              name="enrolledIn"
              onChange={handleChange}
              value={returnDateVal}
              className={isWrongDate ? "wrong" : "value"}
            />
          </div>
          <div className="button-wrapper">
            <button onClick={handleClickConfirm} className="change">
              반납
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
