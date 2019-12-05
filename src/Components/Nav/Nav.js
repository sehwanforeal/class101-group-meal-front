import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavTemplate from "./NavTemplate";
import Icon from "./Icon";
import "./Nav.scss";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roulette: false,
      employees: false,
      // admin: false,
      cell: false
    };
  }

  componentDidMount() {
    const nav = this.props.match.path.slice(1);

    this.setState({
      [nav]: true
    });
  }

  handleNav = nav => {
    const states = this.state;
    let key;

    for (const state in states) {
      if (state === nav) {
        key = nav;
      }
    }

    this.setState({
      [key]: true
    });

    this.props.history.push(`/${nav}`);
  };

  render() {
    const { roulette, employees, admin, cell } = this.state;

    return (
      <div className="navigation-bigger-wrapper">
        <div className="navigation-wrapper">
          <Icon />
          <div className="navigation">
            <NavTemplate
              text="점술판"
              onClick={() => {
                this.handleNav("roulette");
              }}
              isActive={roulette}
            />
            <NavTemplate
              text="클둥이 목록"
              onClick={() => {
                this.handleNav("employees");
              }}
              isActive={employees}
            />
            {/* <NavTemplate
              text="관리자"
              onClick={() => {
                this.handleNav("admin");
              }}
              isActive={admin}
            /> */}
            <NavTemplate
              text="셀 관리"
              onClick={() => {
                this.handleNav("cell");
              }}
              isActive={cell}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
