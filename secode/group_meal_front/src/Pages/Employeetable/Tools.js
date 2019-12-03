import React, { Component } from "react";
import { renderDate } from "utils";

class Tools extends Component {
  constructor() {
    super();
    const defaultDate = renderDate(Date.now());

    this.state = {
      name: "",
      cell: "",
      enrolledIn: defaultDate
    };

    this.card = React.createRef();
  }
  componentDidMount() {
    window.addEventListener("keypress", this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeypress);
  }

  handleKeypress = e => {
    e.keyCode === 13 && this.handleConfirm();
  };

  handleClickBg = e => {
    const { cancelModal } = this.props;

    e.target.contains(this.card.current) && cancelModal();
  };

  handleClickCancel = () => {
    const { cancelModal } = this.props;

    cancelModal();
  };

  handleConfirm = () => {
    const { handleConfirm } = this.props;
    const { name, cell, enrolledIn } = this.state;

    const date = new Date(enrolledIn);

    const memberData = {
      nickName: name,
      cell,
      enrolledIn: date
    };

    handleConfirm(memberData);
  };

  handleSelect = e => {
    const cellName = e.target.value;

    this.setState({ cell: cellName });
  };

  handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({ [key]: value });
  };

  render() {
    const { name, enrolledIn } = this.state;
    const { cells } = this.props;

    return (
      <div className="modal">
        <div
          onClick={this.handleClickBg}
          className="background"
          ref={this.card}
        >
          <div className="card">
            <span onClick={this.handleClickCancel} className="cancel" />
            <div className="input-wrapper">
              <input
                name="name"
                onChange={this.handleChange}
                value={name}
                placeholder="닉네임"
              />
              <select onChange={this.handleSelect}>
                {cells.map(cell => {
                  return <option value={cell.name}>{cell.name}</option>;
                })}
              </select>
              <input
                name="enrolledIn"
                onChange={this.handleChange}
                value={enrolledIn}
                placeholder="1999.01.01"
              />
            </div>
            <div className="button-wrapper">
              <button onClick={this.handleConfirm} className="change">
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tools;
