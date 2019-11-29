import React, { Component } from "react";
import "./Roulette.scss";
import Nav from "Components/Nav";
import roulettemock from "Data/roulettemock.js";
import GroupBox from "Components/GroupBox";
import PreGroupBox from "Components/PreGroupBox";
import roulettegif from "Img/roulette.gif";

export class Roulette extends Component {
  constructor() {
    super();
    this.state = { rouletteMock: roulettemock, isClicked: false };
  }
  render() {
    console.log(typeof true);
    return (
      <div>
        <Nav />
        <div className="roulette-body">
          <div className="rl-empty"></div>

          {this.state.isClicked ? (
            <div className="rl-result-container">
              <div className="rl-uppercontainer">
                <div className="rl-title">점술판 결과!!</div>
                <div calssName="rl-buttoncontainer">
                  <button className="rl-change">수정하기</button>
                  <button className="rl-confirm">컨펌하기</button>
                </div>
              </div>
              {roulettemock.groupMeals.map((el, idx) => {
                return <GroupBox info={el} index={idx} />;
              })}
            </div>
          ) : (
            <div className="rl-runsection">
              <div className="runsection-title">돌려돌려 점술판!!!</div>
              <img
                src={roulettegif}
                alt="noimage"
                className="runsection-gif"
                onClick={() => {
                  this.setState({ isClicked: true });
                }}
              ></img>
            </div>
          )}

          <div className="history-container">
            {" "}
            <div className="rl-uppercontainer">
              <div className="rl-title">이전 점술판</div>
            </div>
            <div className="rl-groupcontainer">
              {roulettemock.groupMeals.map((el, idx) => {
                return <PreGroupBox info={el} index={idx} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Roulette;
