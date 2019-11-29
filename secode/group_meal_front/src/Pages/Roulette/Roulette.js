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
    this.state = {
      rouletteMock: roulettemock.groupMeals,
      isClicked: false
    };
  }
  identifierMethod = (e, i, j) => {
    console.log(e.target.value);
    const routtleMockArr = this.state.rouletteMock.slice();
    routtleMockArr[i][j] = e.target.value;
    this.setState({ rouletteMock: routtleMockArr });
  };

  render() {
    const { rouletteMock } = this.state;

    let allInputs = [];
    if (rouletteMock) {
      for (let i = 0; i < rouletteMock.length; i++) {
        for (let j = 0; j < rouletteMock[i].length; j++) {
          allInputs.push(
            <input
              name={`${i},${j}`}
              value={rouletteMock[i][j]}
              onChange={e => this.identifierMethod(e, i, j)}
              className={j === 0 ? "input-leader" : "input-normal"}
            />
          );
        }
      }
    }
    return (
      <div>
        <Nav />
        <div className="roulette-body">
          <div className="rl-empty"></div>

          {this.state.isClicked ? (
            <div className="rl-result">
              <div className="rl-uppercontainer">
                <div className="rl-title">점술판 결과!!</div>
                <div calssName="rl-buttoncontainer">
                  <button className="rl-confirm">컨펌하기</button>
                </div>
              </div>
              <div className="rl-inputs-container">
                <div className="inputs-title"></div>
                {allInputs}
              </div>
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
