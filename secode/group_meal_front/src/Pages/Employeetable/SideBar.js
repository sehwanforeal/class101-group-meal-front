import React, { Component } from "react";
import "./SideBar.scss";

class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <div className="side-wrapper">
          <div className="logo" />
          <ul>
            <li>점술판</li>
            <li>클둥이 목록</li>
            <li>관리자</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
