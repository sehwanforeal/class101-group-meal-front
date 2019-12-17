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
    fetch("http://10.0.4.124:3030/item")
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  }, []);

  const handleUpload = e => {
    e.preventDefault();
    let csvFile = e.target.files[0];
    setSelectedCsv(csvFile);
  };

  const handleSorting = (target, ms) => {
    fetch(`http://10.0.4.124:3030/item?sort=${target}`)
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

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
                <a href={selectedCsv} download>
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
          <div
            onClick={() => {
              fetch("http://10.0.1.88:3030/csv")
                .then(resp => resp.blob())
                .then(blob => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = url;
                  // the filename you want
                  a.download = "전체비품목록.csv";
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  // or you know, something with better UX...
                })
                .catch(() => alert("oh no!"));
              // .then(res => setSelectedCsv(res))
              // .then(blob => console.log("res", blob))
              // // .then(console.log("done"))
              // .then(console.log("state", selectedCsv));
            }}
          >
            asdasd
            <br />
            asdsadas
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntireItems;

// const make = () => {
//   let array = [];
//   for (let i = 0; i < 70; i++) {
//     array.push(
//       <Row
//         cost={2320020}
//         idx={i}
//         spec={selectedSpec}
//         specHandle={sepcHandler}
//         myObject={myObject}
//       />
//     );
//   }
//   return array;
// };
