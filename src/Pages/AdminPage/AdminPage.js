import React, { Component } from "react";
import "./AdminPage.scss";
import Nav from "Components/Nav";
import UserRow from "./UserRow";
import { url } from "config";

export class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserRows: [],
      NameInput: "",
      EmailInput: ""
    };
  }

  componentDidMount() {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token === null) {
      this.props.history.push("/");
    }
    fetch(`${url}admin`, {
      method: "get",
      headers: { authorization: access_token }
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        this.setState({ UserRows: res.admins });
      });
  }

  handleInputs = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleDelete = adminid => {
    const access_token = sessionStorage.getItem("access_token");
    fetch(`${url}admin/${adminid}`, {
      method: "delete",
      headers: { authorization: access_token }
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        res.message === "success" && window.location.reload();
      });
  };

  handlePost = () => {
    const access_token = sessionStorage.getItem("access_token");
    const name = this.state.NameInput[0];
    const email = this.state.EmailInput[0];
    fetch(`${url}admin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: access_token
      },
      body: JSON.stringify({ name, email })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error === "Bad Request") {
          alert("양식에 맞지 않습니다.");
        } else if (res.error === "Admin already exists") {
          alert("이미 존재하는 관리자입니다.");
        } else {
          window.location.reload();
        }
      });
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="admin-page">
          <div className="main">
            <div className="title">관리자 설정</div>
            <div className="body-container">
              <div className="body-left">
                <div className="body-title">관리자 삭제</div>
                {this.state.UserRows.map((el, idx) => {
                  return (
                    <UserRow submit={this.handleDelete} info={el} index={idx} />
                  );
                })}
              </div>
              <div className="body-right">
                <div className="input-title">관리자 추가</div>
                <input
                  name="NameInput"
                  onChange={this.handleInputs}
                  placeholder="이름"
                  className="input-name"
                ></input>
                <input
                  name="EmailInput"
                  onChange={this.handleInputs}
                  placeholder="이메일"
                  className="input-email"
                ></input>
                <button onClick={this.handlePost} className="submit-inputs">
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
