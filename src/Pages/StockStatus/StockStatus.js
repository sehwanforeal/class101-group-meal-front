import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./StockStatus.scss";
import FirstRow from "./FirstRow";
import Row from "./Row";
import Modal from "./Modal";

function StockStatus(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [selectedTalbe, setSelectedTable] = useState(null);
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(() => {
    fetch("http://10.0.6.233:3030/item")
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  }, []);

  const handleSorting = target => {
    fetch(`http://10.0.6.233:3030/item?sort=${target}`)
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

  const handleModal = () => {
    setIsModalOn(!isModalOn);
  };

  return (
    <div>
      <Nav />
      {isModalOn && (
        <Modal
          onClick={handleModal}
          givenDate={"19.10.01"}
          memberName={"박!세환"}
          itemId={"sample"}
        />
      )}
      <div className="stock-body">
        <div className="article">
          <div onClick={handleModal}>모달 버튼</div>
          <div className="article-title">
            <span>재고현황</span>
          </div>
          <div className="entire-table">
            <FirstRow handleSorting={handleSorting} />
            {selectedTalbe &&
              selectedTalbe.map((el, idx) => {
                return <Row info={el} idx={idx} spec={selectedSpec} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockStatus;
