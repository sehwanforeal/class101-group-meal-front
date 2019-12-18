import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./AssortItems.scss";
import Row from "./Row";

function AssortItems(props) {
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    fetch("http://10.0.4.225:3030/itemType")
      .then(res => res.json())
      .then(res => {
        setRowData(res.itemTypes);
      });
  }, []);
  console.log(rowData);
  return (
    <>
      <Nav />
      <div className="assort-body">
        <div className="article">
          <div className="article-title">비품 종류</div>
          <div className="buttons">
            <button onClick={() => props.history.push("/addtype")}>
              비품 종류 추가하기
            </button>
          </div>
          <div className="table-firstrow">
            <div className="cell">비품종류</div>
            <div className="cell second">모델명</div>
            <div className="cell last"></div>
          </div>
          {rowData &&
            rowData.map(el1 => {
              return el1.itemModels.map(el2 => {
                return (
                  <Row
                    itemType={el1.itemType}
                    itemName={el2.name}
                    typeID={el1._id}
                    itemID={el2._id}
                  />
                );
              });
            })}
          {/* {itemTypes.itemTypes.map(el1 => {
            return el1.itemModels.map(el2 => {
              return (
                <Row
                  itemType={el1.itemType}
                  itemName={el2.name}
                  typeID={el1._id}
                  itemID={el2._id}
                />
              );
            });
          })} */}
        </div>
      </div>
    </>
  );
}

export default AssortItems;
