import React, { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super();
    const { _id, cell, enrolledIn: date, nickName } = props.memberInfo;
    const enrolledIn = this.renderDate(date);

    this.state = {
      nickName,
      cell,
      enrolledIn,
      _id,
      isWrongCell: false,
      isWrongDate: false,
      cells: props.cells
    };

    this.card = React.createRef();
  }

  renderDate = datetime => {
    const fullDate = new Date(datetime);
    const year = fullDate.getFullYear();
    const month =
      fullDate.getMonth() + 1 < 10
        ? "0" + (fullDate.getMonth() + 1)
        : fullDate.getMonth() + 1;
    const date =
      fullDate.getDate() < 10 ? "0" + fullDate.getDate() : fullDate.getDate();

    return `${year}.${month}.${date}`;
  };

  handleKeypress = e => {
    e.keyCode === 13 && this.handleClickConfirm();
  };

  componentDidMount() {
    window.addEventListener("keypress", this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeypress);
  }

  handleClickConfirm = () => {
    const {
      _id,
      nickName,
      cell,
      enrolledIn: datetime,
      isWrongCell,
      isWrongDate
    } = this.state;

    const enrolledIn = new Date(datetime);

    const data = JSON.stringify({ nickName, cell, enrolledIn });

    fetch(`http://localhost:3030/member/${_id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    }).then(res => res.json());

    isWrongCell === false && isWrongDate === false && window.location.reload();
  };

  handleClickDelete = async () => {
    const { _id } = this.state;

    await fetch(`http://localhost:3030/member/${_id}`, {
      method: "DELETE"
    }).then(res => res.json());

    window.location.reload();
  };

  handleClickCancel = () => {
    const { cancelModal } = this.props;

    cancelModal();
  };

  handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value }, () => {
      const { cell, enrolledIn: datetime, cells } = this.state;
      const enrolledIn = new Date(datetime);

      let cellVerification = false;
      let dateVerification = false;

      if (enrolledIn.toDateString() !== "Invalid Date") {
        dateVerification = true;
      } else {
        dateVerification = false;
      }

      cells.forEach(cellData => {
        if (cellData.name === cell) {
          cellVerification = true;
        }
      });

      if (!cellVerification) {
        this.setState({ isWrongCell: true });
      } else {
        this.setState({ isWrongCell: false });
      }

      if (!dateVerification) {
        this.setState({ isWrongDate: true });
      } else {
        this.setState({ isWrongDate: false });
      }
    });
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
