import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Nav from "Components/Nav";
import "./AddItem.scss";
import { url_j, url } from "config";

function AddItem(props) {
  const [price, setPrice] = useState(null);
  const [tag, setTag] = useState(null);
  const [bigo, setBigo] = useState(null);
  const [option, setOption] = useState(null);
  const [optionValueIdx, setOptionValueIdx] = useState(null);
  const [optionValue, setOptionValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);
  const [id, setId] = useState(null);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const headers = {
      authorization: token
    };
    fetch(url_j + "item/iteminfo", { headers })
      .then(res => res.json())
      .then(res => {
        setOption(res.results);
      });
  }, []);

  const handleInput = (e, t) => {
    t(e.target.value);
  };

  const handleSelect = e => {
    setOptionValueIdx(e.target.value);
    e.target.value !== "default" &&
      setOptionValue(option[e.target.value].itemType);
    e.target.value !== "default" &&
      setId(option[e.target.value].uniqueNumberForClient);
    e.target.value !== "default" &&
      setPostId(option[e.target.value].uniqueNumber);
  };

  const handleModel = e => {
    setModelValue(e.target.value);
  };

  const handlePost = () => {
    const data = {
      item: {
        itemType: optionValue,
        model: modelValue,
        uniqueNumber: postId,
        price: price,
        tags: [tag],
        memo: bigo
      }
    };
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    fetch(url_j + "item", {
      method: "post",
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res =>
        res.status === "success"
          ? props.history.push("/entireitems")
          : alert("정보가 올바르지 않습니다!")
      );
  };

  console.log(
    "종류:" + optionValue,
    "모델:" + modelValue,
    "고유번호:" + postId,
    "가격:" + price,
    "태그:" + tag,
    "비고:" + bigo
  );

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
              <select value={optionValueIdx} onChange={e => handleSelect(e)}>
                <option value={"default"}>종류선택</option>
                {option &&
                  option.map((el, idx) => {
                    return (
                      <option value={idx} name="sd">
                        {el.itemType}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="cell">
              {optionValueIdx && optionValueIdx !== "default" && (
                <select value={modelValue} onChange={e => handleModel(e)}>
                  <option value="undefined">모델선택</option>
                  {option[optionValueIdx].itemModels.map((el, idx) => {
                    return (
                      <option value={el.name} name="sd">
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <div className="cell id">
              {optionValueIdx &&
                optionValueIdx !== "default" &&
                optionValue + "_" + id}
            </div>
            <div className="cell price">
              <input onChange={e => handleInput(e, setPrice)} value={price} />원
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
            <button onClick={() => handlePost()}>비품 추가</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(AddItem);
