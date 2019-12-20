import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Nav from "Components/Nav";
import "./ModifyItem.scss";
import FirstRow from "Pages/EntireItems/FirstRow";
import HistoryRow from "./HistoryRow";
import { url_j, url } from "config";
import { convertDateToString, verifyDateString } from "utils";

function ModifyItem(props) {
  const [data, setData] = useState(null);
  const [spec, setSpec] = useState(false);
  const [acquiredDate, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState(null);
  const [memo, setBigo] = useState(null);
  const [usageType, setStatus] = useState(null);
  const [areyousure, setAreyousure] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);

  console.log(data);

  const info = props.location.state;
  const itemID = info.id;
  console.log(info.isArchived);
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };

    fetch(url_j + "item/" + itemID, { headers })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setData(res.message);
        setDate(convertDateToString(res.message.acquiredDate));
        setPrice(res.message.price);
        setTag(res.message.tags === null ? "" : res.message.tags);
        setBigo(res.message.memo);
        setStatus(res.message.usageType);
      });
  }, [itemID]);
  console.log(data && data.provisionHistory);

  const handlePatch = () => {
    if (isDateValid) {
      const body = {
        item: {
          tags: tag,
          price,
          memo,
          usageType
        }
      };
      const token = sessionStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
        authorization: token
      };
      fetch(url_j + "item/" + itemID, {
        method: "post",
        body: JSON.stringify(body),
        headers
      })
        .then(res => res.json())
        .then(res => {
          const { tag, price, memo, usageType } = res.message;
          setTag(tag);
          setPrice(price);
          setBigo(memo);
          setStatus(usageType);
          alert("저장이 완료되었습니다.");
          console.log(res);
        });
    }
  };

  const specHandle = b => {
    b ? setSpec(true) : setSpec(false);
  };

  const handleInput = (e, t) => {
    t(e.target.value);
    console.log(e.target.value);
  };

  const toggleSure = () => {
    setAreyousure(areyousure ? false : true);
  };

  const handleWaste = () => {
    const body = {
      item: { isArchived: true }
    };
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    fetch(url_j + "item/" + itemID, {
      method: "post",
      body: JSON.stringify(body),
      headers
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
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    fetch(url_j + "item/" + itemID, {
      method: "post",
      body: JSON.stringify(body),
      headers
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "success") {
          props.history.push("/entireitems");
        }
      });
  };

  const handleDelete = () => {
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    fetch(url_j + "item/" + itemID, {
      method: "delete",
      headers
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "success") {
          console.log(res);
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
              {info.itemType.name}_{info.uniqueNumberForClient}
            </div>
            <div className="cell">{info.owner && info.owner.cell.name}</div>
            <div className="cell">
              {info.owner === null ? "" : info.owner.nickName}
            </div>
            <div className="cell">{info.itemType.name}</div>
            <div className="cell">{info.model.name}</div>
            <div className="cell">
              <input
                type="text"
                value={data && convertDateToString(data.acquiredDate)}
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
              <select
                value={usageType}
                onChange={e => handleInput(e, setStatus)}
              >
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
                <button onClick={() => handleDelete()} className="sure">
                  정말로 삭제
                </button>
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
            data.provisionHistories.map(el => {
              return <HistoryRow info={el} />;
            })}
        </div>
      </div>
    </>
  );
}

export default withRouter(ModifyItem);
