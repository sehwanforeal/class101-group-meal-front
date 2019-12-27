import React, { Component } from "react";
import Tables from "./Tables";
import Modal from "./Modal";
import Tools from "./Tools";
import Nav from "Components/Nav";
import Title from "Components/Title";
import CreateButton from "Components/CreateButton";
import "./Employeetable.scss";
import config from "config.js";

class EmployeeTable extends Component {
  state = {
    members: [],
    memberInfo: {},
    cells: [],
    isModalOn: false,
    createMember: false
  };

  componentDidMount() {
    this.fetchMembers();
    this.fetchCells();
  }

  fetchMembers = async () => {
    const url = config.url + "member";

    const access_token = sessionStorage.getItem("access_token");
    // if (access_token === null) {
    //   this.props.history.push("/");
    // }

    const list = await fetch(url, {
      headers: {
        authorization: access_token
      }
    }).then(res => res.json());

    this.setState({
      members: list
    });
  };

  fetchCells = async () => {
    const url = config.url + "cell";

    const access_token = sessionStorage.getItem("access_token");

    let cells = await fetch(url, {
      headers: {
        authorization: access_token
      }
    }).then(res => res.json());

    cells.unshift("셀을 선택해주세요");

    this.setState({ cells });
  };

  handleClick = memberInfo => {
    this.setState({
      memberInfo: memberInfo,
      isModalOn: true
    });
  };

  cancelModal = () => {
    this.setState({
      isModalOn: false,
      createMember: false
    });
  };

  createMember = () => {
    this.setState({ createMember: true });
  };

  verifyNewMember = memberData => {
    const { nickName, cell, enrolledIn } = memberData;

    if (nickName.length > 0 && cell.length > 0) {
      return enrolledIn.toDateString() !== "Invalid Date";
    } else {
      return false;
    }
  };

  handleConfirm = memberData => {
    const url = config.url + "member";

    if (this.verifyNewMember(memberData)) {
      const data = JSON.stringify(memberData);

      const access_token = sessionStorage.getItem("access_token");

      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: access_token
        },
        method: "POST",
        body: data
      }).then(res => window.location.reload());
    }
  };

  render() {
    const { members, memberInfo, isModalOn, cells, createMember } = this.state;

    return (
      <>
        {isModalOn && (
          <Modal
            cells={cells}
            cancelModal={this.cancelModal}
            memberInfo={memberInfo}
          />
        )}
        {createMember && (
          <Tools
            cells={cells}
            cancelModal={this.cancelModal}
            handleConfirm={this.handleConfirm}
          />
        )}
        <Nav />
        <div className="page">
          <main>
            <Title title="클둥이 목록" />
            <CreateButton text="뉴비 추가" onClick={this.createMember} />
            <div className="tables">
              <Tables onClick={this.handleClick} listData={members} />
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default EmployeeTable;
