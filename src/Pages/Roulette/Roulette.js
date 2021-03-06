import React, { Component } from "react";
import Title from "./Title";
import Result from "./Result";
import Nav from "Components/Nav";
import PreGroupBox from "Components/PreGroupBox";
import "./Roulette.scss";
import { client_id, client_secret, url } from "config";

class Roulette extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      rouletteMock: [],
      historyData: [],
      isDataCame: false,
      isLoading: false,
      driverHistory: []
    };
  }

  componentDidMount() {
    const access_token = sessionStorage.getItem("access_token");
    fetch(`${url}groupMeal/history`, {
      method: "get",
      headers: { authorization: access_token }
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        this.setState({
          historyData: res,
          isDataCame: true,
          isLoading: false,
          driverHistory: res[0].history.map(el => el.group[3].nickName)
        });
      });
  }

  runRoulette = () => {
    const access_token = sessionStorage.getItem("access_token");
    this.setState({ isLoading: true });
    fetch(`${url}groupMeal`, {
      method: "get",
      headers: { authorization: access_token }
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        this.setState({ isClicked: true, rouletteMock: res, isLoading: false });
        console.log(res.map(el => el[1]));
      });
  };

  sendAndReturn = () => {
    const access_token = sessionStorage.getItem("access_token");
    fetch(`${url}groupMeal`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: access_token
      },
      body: JSON.stringify({
        groupMeals: this.state.rouletteMock
      })
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        alert("점술판이 반영되었습니다");
        this.setState({
          isClicked: false
        });
        window.location.reload();
      });
  };

  render() {
    const {
      rouletteMock,
      isClicked,
      historyData,
      isLoading,
      driverHistory
    } = this.state;
    driverHistory && console.log(driverHistory);
    return (
      <>
        <Nav />
        <div className="roulette-body">
          <Result
            isClicked={isClicked}
            rouletteMock={rouletteMock}
            onClick={this.sendAndReturn}
            runRoulette={this.runRoulette}
            isLoading={isLoading}
          />
          <div className="history-container">
            <Title title={"현재 점술판"} />

            <div className="rl-groupcontainer">
              {historyData.length !== 0 ? (
                historyData[0].history.map((el, idx) => {
                  return <PreGroupBox info={el} index={idx} />;
                })
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {}
        </div>
      </>
    );
  }
}

export default Roulette;
