import React, { useState, useEffect } from "react";
import Pagination from "Components/Pagination";
import Nav from "Components/Nav";
import "./StockStatus.scss";
import FirstRow from "./FirstRow";
import Row from "./Row";
import Modal from "./Modal";
import { url_j, url } from "config";

function StockStatus(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOn, setIsModalOn] = useState(false);
  const [id, setId] = useState(null);
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
        `&usageType="재고"`,
      { headers }
    )
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  }, [currentPage, headers, target]);

  console.log(selectedTable);

  const handleSorting = (sortBy = target, pageNumber) => {
    setTarget(sortBy);

    fetch(
      url_j +
        "item?isArchived=false&sort=" +
        sortBy +
        "&page=" +
        pageNumber +
        "&limit=100" +
        `&usageType="재고"`,
      { headers }
    )
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

  const handleModal = () => {
    setIsModalOn(!isModalOn);
    fetch(`${url_j}item?isArchived=false&usageType="재고"`, { headers })
      .then(res => res.json())
      .then(res => setSelectedTable(res.message));
  };

  const handleReturn = id => {
    setId(id);
    handleModal();
  };

  const changePage = pageNumber => {
    pageNumber > 0 && setCurrentPage(pageNumber);

    handleSorting(target, pageNumber);
  };

  return (
    <div>
      <Nav />
      {isModalOn && (
        <Modal onClick={handleModal} memberName={"박!세환"} itemId={id} />
      )}
      <div className="stock-body">
        <div className="article">
          <div className="article-title">
            <span>재고현황</span>
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

export default StockStatus;
