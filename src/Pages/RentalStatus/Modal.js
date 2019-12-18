import React, { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super();

    this.state = {};
  }

  handleClickConfirm = () => {
    fetch(`url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: "mola"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.message === "success") {
          console.log(res);
        }
      });
  };

  handleClickCancel = () => {
    const { cancelModal } = this.props;

    cancelModal();
  };

  handleClickBg = e => {
    const { cancelModal } = this.props;
    e.target.contains(this.card.current) && cancelModal();
  };

  render() {
    const { nickName, enrolledIn, cell, isWrongCell, isWrongDate } = this.state;

    return (
      <div className="modal">
        <div
          onClick={this.handleClickBg}
          className="background"
          ref={this.card}
        >
          <div className="card">
            <span onClick={this.handleClickCancel} className="cancel"></span>
            <div className="row">
              <div className="key">닉네임</div>
              <input
                name="nickName"
                onChange={this.handleChange}
                value={nickName}
                className="value"
              />
            </div>
            <div className="row">
              <div className="key">소속</div>
              <input
                name="cell"
                onChange={this.handleChange}
                value={cell}
                className={isWrongCell ? "wrong" : "value"}
              />
            </div>
            <div className="row">
              <div className="key">입사일</div>
              <input
                name="enrolledIn"
                onChange={this.handleChange}
                value={enrolledIn}
                className={isWrongDate ? "wrong" : "value"}
              />
            </div>
            <div className="button-wrapper">
              <button onClick={this.handleClickConfirm} className="change">
                확인
              </button>
              <button onClick={this.handleClickDelete} className="delete">
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
