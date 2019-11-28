import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Nav.scss";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoulette: false,
      isEmployeetable: false,
      isAdminPage: false
    };
  }
  componentDidMount() {
    this.setState({
      isRoulette: this.props.match.path === "/roulette" ? true : false,
      isEmployeetable:
        this.props.match.path === "/employeetable" ? true : false,
      isAdminPage: this.props.match.path === "/adminpage" ? true : false
    });
  }

  handleRoulette = () => {
    this.setState({
      isRoulette: this.state.isRoulette ? false : true,
      isEmployeetable: false,
      isAdminPage: false
    });
    this.props.history.push("/roulette");
  };

  handleEmployeetable = () => {
    this.setState({
      isEmployeetable: this.state.isEmployeetable ? false : true,
      isRoulette: false,
      isAdminPage: false
    });
    this.props.history.push("/employeetable");
  };

  handleAdminPage = () => {
    this.setState({
      isAdminPage: this.state.isAdminPage ? false : true,
      isEmployeetable: false,
      isRoulette: false
    });
    this.props.history.push("/adminpage");
  };

  render() {
    let { isRoulette, isEmployeetable, isAdminPage } = this.state;

    return (
      <div className="navigation-bigger-wrapper">
        <div className="navigation-wrapper">
          <div className="navigation">
            <div
              onClick={this.handleRoulette}
              className={
                isRoulette === true
                  ? "navigation-text-wrap-done"
                  : "navigation-text-wrap"
              }
              name
            >
              <div className="navigation-text">점술판</div>
            </div>
            <div
              onClick={this.handleEmployeetable}
              className={
                isEmployeetable === true
                  ? "navigation-text-wrap-done"
                  : "navigation-text-wrap"
              }
            >
              <div className="navigation-text">클둥이목록</div>
            </div>
            <div
              onClick={this.handleAdminPage}
              className={
                isAdminPage === true
                  ? "navigation-text-wrap-done"
                  : "navigation-text-wrap"
              }
            >
              <div className="navigation-text">어드민페이지</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
