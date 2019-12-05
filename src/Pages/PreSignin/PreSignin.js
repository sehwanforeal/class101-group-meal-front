import React, { Component } from "react";
import "./PreSignin.scss";
import Icon from "Components/Nav/Icon";
// import axios from "axios";
import { url } from "config";

export class Signin extends Component {
  constructor() {
    super();
    this.state = { KeyValue: "", WrongKey: false };
  }

  handleKeypress = e => {
    e.keyCode === 13 && this.handleClickConfirm();
  };

  componentDidMount() {
    window.addEventListener("keypress", this.handleKeypress);
  }

  handleClickConfirm = () => {
    const { KeyValue } = this.state;
    const access_key = JSON.stringify({ access_key: KeyValue });
    fetch(`${url}access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: access_key
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.message === "success") {
          sessionStorage.setItem("access_token", res.access_token);
          this.props.history.push("/roulette");
        } else {
          this.setState({ WrongKey: true, KeyValue: "" });
        }
      });
  };

  handleInput = e => {
    this.setState({ KeyValue: e.target.value, WrongKey: false });
  };

  render() {
    return (
      <div className="presignin-body">
        <Icon />
        <span className="signin-span">EX ADMIN</span>
        <div className="input-container">
          <input
            onChange={this.handleInput}
            placeholder="엑세스키를 입력해주세요"
            className="access-input"
            type="password"
            value={this.state.KeyValue}
          ></input>
          <button
            onClick={this.handleClickConfirm}
            className={this.state.KeyValue.length > 1 ? "active" : "false"}
          >
            접속
          </button>
        </div>
        {this.state.WrongKey && (
          <span className="wrong-alert">엑세스키가 올바르지 않습니다!!</span>
        )}
      </div>
    );
  }
}

export default Signin;
