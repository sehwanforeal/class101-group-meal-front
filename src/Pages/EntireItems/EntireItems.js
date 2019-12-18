import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./EntireItems.scss";
import FirstRow from "./FirstRow";
import Row from "./Row";

function EntireItems(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [selectedTalbe, setSelectedTable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sepcHandler = idx => {
    setSelectedSpec(idx);
  };

  useEffect(() => {
    fetch("http://10.0.6.233:3030/item")
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  }, []);

  const handleUpload = e => {
    const files = e.target.files;
    const formData = new FormData();
    setIsLoading(true);
    formData.append("data", files[0]);
    fetch("http://10.58.7.215:3030/csv", {
      method: "post",
      body: formData
    })
      .then(res => console.log(res))
      .then(res => setIsLoading(true));
    // .then(window.location.reload());
  };

  const handleSorting = (target, ms) => {
    fetch(`http://10.0.6.233:3030/item?sort=${target}`)
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

  return (
    <div>
      <Nav />
      <div className="entire-body">
        <div className="article">
          <div className="article-title">
            <span>전체비품</span>
            <div className="title-right">
              <div className="button">
                <label for="fileUpload">csv로 업로드</label>
                <input
                  onChange={e => handleUpload(e)}
                  type="file"
                  id="fileUpload"
                ></input>
              </div>
              <div className="button">
                <div
                  onClick={() => {
                    fetch("http://10.58.7.215:3030/csv")
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
            {selectedTalbe &&
              selectedTalbe.map((el, idx) => {
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
        </div>
      </div>
    </div>
  );
}

export default EntireItems;
