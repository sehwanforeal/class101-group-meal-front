import React, { Component } from "react";
import Modal from "./Modal";
import Nav from "Components/Nav";
import Tables from "Components/Tables";
import Title from "Components/Title";
import CreateButton from "Components/CreateButton";
import "./Cell.scss";
import config from "config.js";

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

  componentDidMount() {
    this.fetchCells();
    window.addEventListener("keypress", this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeypress);
  }

  handleKeypress = e => {
    e.keyCode === 13 && this.handleConfirm();
  };

  fetchCells = async () => {
    const access_token = sessionStorage.getItem("access_token");
    const response = await fetch(`${config.url}cell`, {
      headers: { authorization: access_token }
    }).then(res => res.json());

    const cells = response.map(res => {
      return res;
    });

    this.setState({ cells });
  };

  handleClick = cell => {
    this.setState({ modalOn: true, inputVal: cell, selectedCell: cell });
  };

  cancelInput = e => {
    e.target.contains(this.page.current) &&
      this.setState({ modalOn: false, inputVal: "" });
  };

  cancelModal = () => {
    this.setState({ modalOn: false, inputVal: "", createMode: false });
  };

  handleChange = e => {
    const val = e.target.value;

    this.setState({ inputVal: val });
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
    const access_token = sessionStorage.getItem("access_token");

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: access_token
      },
      body: JSON.stringify({ name: inputVal })
    }).then(res => window.location.reload());
  };

  deleteCell = () => {
    const { inputVal } = this.state;
    const cellId = this.getCellId(inputVal);
    const url = config.url + "cell/" + cellId;
    const access_token = sessionStorage.getItem("access_token");

    fetch(url, {
      method: "DELETE",
      headers: {
        authorization: access_token
      }
    }).then(res => window.location.reload());
  };

  handleClickTool = () => {
    this.setState({ modalOn: true, createMode: true });
  };

  createCell = () => {
    const { inputVal } = this.state;
    const url = config.url + "cell";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: inputVal })
    }).then(res => window.location.reload());
  };

  render() {
    const { cells, inputVal, modalOn, createMode } = this.state;

    return (
      <>
        <Nav />
        <div className="page" ref={this.page} onClick={this.cancelInput}>
          <main>
            <Title title="셀 관리" />
            <CreateButton text="셀 추가" onClick={this.handleClickTool} />
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
