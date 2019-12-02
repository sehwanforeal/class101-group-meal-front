import React, { Component } from "react";
import Nav from "Components/Nav";
import Tables from "Components/Tables";
import "./Cell.scss";
import config from "config.js";
import Modal from "./Modal";

class Cell extends Component {
  constructor() {
    super();
    this.state = {
      cells: [],
      modalOn: false,
      createMode: false,
      inputVal: "",
      selectedCell: ""
    };

    this.page = React.createRef();
  }

  handleKeypress = e => {
    e.keyCode === 13 && this.handleConfirm();
  };

  componentDidMount() {
    this.fetchCells();
    window.addEventListener("keypress", this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeypress);
  }

  fetchCells = async () => {
    const response = await fetch(`${config.url}cell`).then(res => res.json());

    const cells = response.map(res => {
      return res;
    });

    this.setState({ cells });
  };

  handleClick = cell => {
    this.setState({ modalOn: true, inputVal: cell, selectedCell: cell });
  };

  handleChange = e => {
    const val = e.target.value;

    this.setState({ inputVal: val });
  };

  cancelInput = e => {
    e.target.contains(this.page.current) &&
      this.setState({ modalOn: false, inputVal: "" });
  };

  cancelModal = () => {
    this.setState({ modalOn: false, inputVal: "", createMode: false });
  };

  getCellId = cellName => {
    const { cells } = this.state;

    let cellId = "";

    cells.forEach(cell => {
      if (cell.name === cellName) {
        cellId = cell._id;
      }
    });

    return cellId;
  };

  handleConfirm = async () => {
    const { selectedCell, inputVal } = this.state;
    const cellId = this.getCellId(selectedCell);
    const url = config.url + "cell/" + cellId;

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: inputVal })
    })
      .then(res => res.json())
      .then(res => console.log(res));

    window.location.reload();
  };

  deleteCell = async () => {
    const { inputVal } = this.state;
    const cellId = this.getCellId(inputVal);
    const url = config.url + "cell/" + cellId;

    await fetch(url, {
      method: "DELETE"
    }).then(res => res.json());

    window.location.reload();
  };

  handleClickTool = () => {
    this.setState({ modalOn: true, createMode: true });
  };

  createCell = async () => {
    const { inputVal } = this.state;
    const url = config.url + "cell";

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: inputVal })
    });

    window.location.reload();
  };

  render() {
    const { cells, inputVal, modalOn, createMode } = this.state;

    return (
      <>
        <Nav />
        <div className="page" ref={this.page} onClick={this.cancelInput}>
          <main>
            <div className="title">
              <span>셀 관리</span>
            </div>
            <div className="tools">
              <button onClick={this.handleClickTool}>셀 추가</button>
            </div>
            <div className="tables">
              <Tables
                onClick={this.handleClick}
                listData={cells.map(cell => cell.name)}
              />
            </div>
          </main>
          {modalOn && (
            <div className="background">
              <Modal
                createCell={this.createCell}
                createMode={createMode}
                handleChange={this.handleChange}
                inputVal={inputVal}
                handleConfirm={this.handleConfirm}
                deleteCell={this.deleteCell}
                cancelModal={this.cancelModal}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Cell;
