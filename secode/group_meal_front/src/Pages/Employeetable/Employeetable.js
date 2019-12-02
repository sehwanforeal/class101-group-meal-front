import React, { Component } from "react";
import "./Employeetable.scss";
import Nav from "Components/Nav";
import Tables from "./Tables";
import Modal from "./Modal";
import Tools from "./Tools";
import config from "config.js";
import { create } from "domain";

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
    const { members } = this.state;

    const list = await fetch(`${config.url}member`).then(res => res.json());

    this.setState({
      members: members.concat(list)
    });
  };

  fetchCells = async () => {
    const url = config.url + "cell";

    let cells = await fetch(url).then(res => res.json());

    cells.unshift("");

    this.setState({ cells });
  };

  handleClick = async name => {
    const memberData = await fetch(`${config.url}member/${name}`).then(res =>
      res.json()
    );

    const cellData = await fetch(`${config.url}cell`).then(res => res.json());

    this.setState({
      memberInfo: memberData.member,
      cells: cellData,
      isModalOn: true
    });
  };

  cancelModal = () => {
    this.setState({ isModalOn: false, createMember: false });
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

  handleConfirm = async memberData => {
    const url = config.url + "member";

    if (this.verifyNewMember(memberData)) {
      const data = JSON.stringify(memberData);

      await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: data
      }).then(res => res.json());
    }

    window.location.reload();
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
            <div className="title">
              <span>클둥이 목록</span>
            </div>
            <div className="tools">
              <button onClick={this.createMember}>뉴비 추가</button>
            </div>
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
