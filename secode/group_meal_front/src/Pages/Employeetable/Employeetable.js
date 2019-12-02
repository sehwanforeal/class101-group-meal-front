import React, { Component } from "react";
import "./Employeetable.scss";
import Nav from "Components/Nav";
import Tables from "./Tables";
import Modal from "./Modal";
// import NewCell from "./NewCell";

class EmployeeTable extends Component {
  state = {
    members: [],
    memberInfo: {},
    cells: [],
    isModalOn: false,
    tool: false
  };

  componentDidMount() {
    this.fetchMembers();
  }

  fetchMembers = async () => {
    const { members } = this.state;

    const list = await fetch("http://localhost:3030/member").then(res =>
      res.json()
    );

    this.setState({
      members: members.concat(list)
    });
  };

  handleClick = async name => {
    const memberData = await fetch(
      `http://localhost:3030/member/${name}`
    ).then(res => res.json());

    const cellData = await fetch(`http://localhost:3030/cell`).then(res =>
      res.json()
    );

    this.setState({
      memberInfo: memberData.member,
      cells: cellData,
      isModalOn: true
    });
  };

  cancelModal = () => {
    this.setState({ isModalOn: false });
  };

  handleClickTool = () => {
    const { tool } = this.state;

    this.setState({ tool: !tool });
  };

  render() {
    const { members, memberInfo, isModalOn, cells, tool } = this.state;

    return (
      <>
        {isModalOn && (
          <Modal
            cells={cells}
            cancelModal={this.cancelModal}
            memberInfo={memberInfo}
          />
        )}
        {tool && <div></div>}
        <Nav />
        <div className="page">
          <main>
            <div className="title">
              <span>클둥이 목록</span>
            </div>
            <div className="tools">
              <button onClick={this.handleClickTool}>셀 변경, 뉴비 추가</button>
            </div>
            <div className="tables">
              <Tables onClick={this.handleClick} memberList={members} />
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default EmployeeTable;
