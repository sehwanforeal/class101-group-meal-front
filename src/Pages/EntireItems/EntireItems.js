import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./EntireItems.scss";
import FirstRow from "./FirstRow";
import Row from "./Row";
import Pagination from "Components/Pagination";
import { url_j, url } from "config";
import { convertDateToString } from "utils";
import loading from "Img/loading.gif";

function EntireItems(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [target, setTarget] = useState("itemType,uniqueNumber");

  const sepcHandler = idx => {
    setSelectedSpec(idx);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    fetch(url_j + "item?isArchived=false&sort=" + target, { headers })
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = e => {
    const files = e.target.files;
    const formData = new FormData();
    setIsLoading(true);
    formData.append("data", files[0]);
    const token = sessionStorage.getItem("access_token");
    const headers = {
      authorization: token
    };
    fetch(url_j + "csv", {
      headers,
      method: "post",
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res.status === "success" && setIsLoading(false);
      });
  };

  const handleSorting = (sortBy = target, pageNumber) => {
    setTarget(sortBy);
    const token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      authorization: token
    };
    fetch(
      url_j +
        "item?isArchived=false&sort=" +
        sortBy +
        "&page=" +
        pageNumber +
        "&limit=100",
      { headers }
    )
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

  const changePage = pageNumber => {
    pageNumber > 0 && setCurrentPage(pageNumber);

    handleSorting(target, pageNumber);
  };

  return (
    <div>
      <Nav />
      <div className="entire-body">
        <div className="article">
          <div className="article-title">
            <span>전체비품</span>
            <div className="title-right">
              {isLoading ? (
                <img src={loading} alt="로딩중" />
              ) : (
                <div className="button">
                  <label for="fileUpload">csv로 업로드</label>
                  <input
                    onChange={e => !isLoading && handleUpload(e)}
                    type="file"
                    id="fileUpload"
                  ></input>
                </div>
              )}
              <div className="button">
                <div
                  onClick={() => {
                    // const token = sessionStorage.getItem("access_token");
                    // const headers = {
                    //   "Content-Type": "application/json",
                    //   authorization: token
                    // };
                    fetch(url_j + "csv")
                      .then(resp => resp.blob())
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.style.display = "none";
                        a.href = url;

                        a.download = "전체비품목록.csv";
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                      })
                      .catch(() => alert("다운로드실패"));
                  }}
                >
                  csv로 다운로드
                </div>
              </div>
              <div
                onClick={() => {
                  props.history.push("/additem");
                }}
                className="button"
              >
                새로운 비품 추가
              </div>
            </div>
          </div>
          <div className="entire-table">
            <FirstRow handleSorting={handleSorting} />
            {selectedTable &&
              selectedTable.items.map((el, idx) => {
                return (
                  <Row
                    info={el}
                    idx={idx}
                    spec={selectedSpec}
                    specHandler={sepcHandler}
                  />
                );
              })}
          </div>
          <Pagination
            pageCount={
              selectedTable && Math.ceil(selectedTable.itemTotalNum / 100)
            }
            currentPage={currentPage}
            changePage={changePage}
          />
        </div>
      </div>
    </div>
  );
}

export default EntireItems;
