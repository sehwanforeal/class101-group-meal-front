import React, { Component } from "react";
import "./AdminPage.scss";
import Nav from "Components/Nav";

export class AdminPage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="admin-page">
          <div className="main">
            <div className="title">관리자페이지</div>
            <div className="body-container">
              <div className="body-left">
                <div className="user-row"></div>
              </div>
              <div className="body-right"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
