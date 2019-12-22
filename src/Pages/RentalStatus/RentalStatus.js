import React, { useState, useEffect } from "react";
import Nav from "Components/Nav";
import "./RentalStatus.scss";
import FirstRow from "../EntireItems/FirstRow";
import Row from "./Row";
import Modal from "./Modal";
import { url_j, url } from "config";
import Pagination from "Components/Pagination";

function RentalStatus(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModelOn, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [owner, setOwner] = useState(null);
  const [date, setDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [target, setTarget] = useState("itemType,uniqueNumber");
  const token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    authorization: token
  };

  useEffect(() => {
    fetch(
      url_j +
        "item?isArchived=false&sort=" +
        target +
        "&page=" +
        currentPage +
        "&limit=100" +
        `&usageType="지급"`,
      { headers }
    )
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSorting = (sortBy = target, pageNumber) => {
    setTarget(sortBy);

    fetch(
      url_j +
        "item?isArchived=false&sort=" +
        sortBy +
        "&page=" +
        pageNumber +
        "&limit=100" +
        `&usageType="지급"`,
      { headers }
    )
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

  const handleClick = () => {
    setModal(!isModelOn);
    fetch(`${url_j}item?isArchived=false&usageType="지급"`, { headers })
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

  const handleReturn = id => {
    setId(id);
    handleClick();
  };

  const changePage = pageNumber => {
    pageNumber > 0 && setCurrentPage(pageNumber);

    handleSorting(target, pageNumber);
  };

  return (
    <div>
      {/* <div className="rental-body" onClick={handleClick}>
        RentalStatus
      </div> */}
      {isModelOn && (
        <Modal
          onClick={handleClick}
          // givenDate={}
          memberName={owner}
          itemId={id}
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
            {selectedTable &&
              selectedTable.items.map((el, idx) => {
                return (
                  <Row
                    info={el}
                    idx={idx}
                    spec={selectedSpec}
                    handleReturn={handleReturn}
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

export default RentalStatus;
