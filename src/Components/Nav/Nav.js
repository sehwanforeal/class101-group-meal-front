import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavTemplate from "./NavTemplate";
import NavTemplateSmall from "./NavTemplateSmall";
import Icon from "./Icon";
import "./Nav.scss";
import sam from "Img/sam2.png";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roulette: false,
      employees: false,
      admin: false,
      cell: false,
      assortitems: false,
      entireitems: false,
      rentalstatus: false,
      stockstatus: false,
      wasteditems: false,
      isOpened: true
    };
  }

  componentDidMount() {
    const nav = this.props.match.path.slice(1);
    console.log(nav);
    this.setState({
      [nav]: true
    });
    if (nav === "roulette" || "employees" || "admin" || "cell") {
      this.setState({ isOpened: false });
    }
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

  openAsset = () => {
    const { isOpened } = this.state;
    this.setState({ isOpened: isOpened ? false : true });
  };

  render() {
    const {
      roulette,
      employees,
      admin,
      cell,
      assortitems,
      entireitems,
      rentalstatus,
      stockstatus,
      wasteditems
    } = this.state;
    console.log(this.state.isOpened);
    return (
      <div className="navigation-bigger-wrapper">
        <div className="navigation-wrapper">
          <Icon />
          <div className="navigation">
            <div className="open-asset-container">
              <div onClick={this.openAsset} className="asset-title">
                비품관리
              </div>
              <div className={this.state.isOpened ? "asset-taps" : "norender"}>
                <NavTemplateSmall
                  text="- 전체비품"
                  onClick={() => {
                    this.handleNav("entireitems");
                  }}
                  isActive={entireitems}
                />
                <NavTemplateSmall
                  text="- 대여/지급 현황"
                  onClick={() => {
                    this.handleNav("rentalstatus");
                  }}
                  isActive={rentalstatus}
                />
                <NavTemplateSmall
                  text="- 재고현황"
                  onClick={() => {
                    this.handleNav("stockstatus");
                  }}
                  isActive={stockstatus}
                />
                <NavTemplateSmall
                  text="- 폐기목록"
                  onClick={() => {
                    this.handleNav("wasteditems");
                  }}
                  isActive={wasteditems}
                />
                <NavTemplateSmall
                  text="- 전체 비품 종류"
                  onClick={() => {
                    this.handleNav("assortitems");
                  }}
                  isActive={assortitems}
                />
              </div>
            </div>
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
            <NavTemplate
              text="관리자"
              onClick={() => {
                this.handleNav("admin");
              }}
              isActive={admin}
            />
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
