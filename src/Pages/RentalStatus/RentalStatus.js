import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./RentalStatus.scss";
import FirstRow from "../EntireItems/FirstRow";
import Row from "./Row";
import Modal from "./Modal";

function RentalStatus(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [selectedTalbe, setSelectedTable] = useState(null);
  const [isModelOn, setModal] = useState(false);

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

  const handleClick = () => {
    setModal(!isModelOn);
  };

  return (
    <div>
      <div className="rental-body" onClick={handleClick}>
        RentalStatus
      </div>
      {isModelOn && (
        <Modal
          onClick={handleClick}
          givenDate={"19.10.01"}
          memberName={"박!세환"}
          itemId={"sample"}
        />
      )}
      <Nav />
      <div className="entire-body">
        <div className="article">
          <div className="article-title">
            <span>대여 / 지급 현황</span>
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

export default RentalStatus;
