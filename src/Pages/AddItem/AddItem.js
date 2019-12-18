import React, { useEffect, useState } from "react";
import Nav from "Components/Nav";
import "./AddItem.scss";

function AddItem() {
  const [price, setPrice] = useState(null);
  const [tag, setTag] = useState(null);
  const [bigo, setBigo] = useState(null);
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    fetch("http://10.0.4.225:3030/itemType")
      .then(res => res.json())
      .then(res => {
        setRowData(res.itemTypes);
      });
  }, []);

  const handleInput = (e, t) => {
    t(e.target.value);
  };

  const handleSelect = e => {};

  return (
    <>
      <Nav />
      <div className="add-body">
        <div className="article">
          <div className="title">비품추가</div>
          <div className="table-firstrow">
            <div className="cell first">비품종류</div>
            <div className="cell">모델명</div>
            <div className="cell">고유번호</div>
            <div className="cell">가격</div>
            <div className="cell">태그</div>
            <div className="cell final">비고</div>
          </div>
          <div className="table-firstrow table-row">
            <div className="cell first">
              <select>
                <option value="">종류선택</option>
                {rowData &&
                  rowData.map(el => {
                    return <option value={el.itemType}>{el.itemType}</option>;
                  })}
              </select>
            </div>
            <div className="cell">
              <select>
                <option value="">모델명선택</option>
                <option value="학생">MAC-343243</option>
                <option value="회사원">MOC-A3146</option>
                <option value="기타">MIC-S35234</option>
              </select>
            </div>
            <div className="cell id"></div>
            <div className="cell price">
              <input
                onChange={e => handleInput(e, setPrice)}
                type="text"
                value={price}
              />
              원
            </div>
            <div className="cell tag">
              <input
                onChange={e => handleInput(e, setTag)}
                type="text"
                value={tag}
                className="taginput"
              />
            </div>
            <div className="cell final bigo">
              <textarea
                onChange={e => handleInput(e, setBigo)}
                type="text"
                value={bigo}
                placeholder="비고작성.."
              ></textarea>
            </div>
          </div>
          <div className="actions">
            <button>비품 추가</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
