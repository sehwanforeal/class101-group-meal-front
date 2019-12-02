import React, { Component } from "react";

export class NewCell extends Component {
  handleClickCancel = () => {
    const { cancelNewCell } = this.props;

    cancelNewCell();
  };

  render() {
    return (
      <div className="modal">
        <div onClick={this.handleClickCancel} className="background">
          <div className="card">
            <span onClick={this.handleClickCancel} className="cancel" />
            <div className="row">
              <div className="key">추가할 셀</div>
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

export default NewCell;
