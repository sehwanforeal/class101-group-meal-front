import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import something from "Img/something.csv";
import "./EntireItems.scss";
import FirstRow from "./FirstRow";
import Row from "./Row";

function EntireItems(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [selectedTalbe, setSelectedTable] = useState(null);

  const sepcHandler = idx => {
    setSelectedSpec(idx);
  };

  useEffect(() => {
    console.log("didMount");
    // fetch("")
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(response => {
    //     setSelectedTable(response)
    //   })

    //   .catch(err => {
    //     console.log(err);
    //   });
  }, []);

  const make = () => {
    let array = [];
    let myObject = { hi: "hello", hola: "como estas" };
    for (let i = 0; i < 70; i++) {
      array.push(
        <Row
          cost={2320020}
          idx={i}
          spec={selectedSpec}
          specHandle={sepcHandler}
          myObject={myObject}
        />
      );
    }
    return array;
  };

  const handleUpload = e => {
    e.preventDefault();
    let csvFile = e.target.files[0];
    setSelectedCsv(csvFile);
  };

  const arr = make();
  const img = something;
  return (
    <div>
      <Nav />
      <div className="entire-body">
        <div className="article">
          <div className="article-title">
            <span>전체비품</span>
            <div className="title-right">
              <div className="button">
                <label for="uploadCsv">csv로 업로드</label>
                <input
                  onChange={e => handleUpload(e)}
                  id="uploadCsv"
                  accept=".csv, .xlsx, .xls"
                  type="file"
                ></input>
              </div>
              <div className="button">
                <a href={img} download>
                  csv로 다운로드
                </a>
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
            <FirstRow />
            {arr}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntireItems;
