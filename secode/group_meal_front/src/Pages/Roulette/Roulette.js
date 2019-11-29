import React, { Component } from "react";
import "./Roulette.scss";
import Nav from "Components/Nav";
import roulettemock from "Data/roulettemock.js";
import GroupBox from "Components/GroupBox";
import PreGroupBox from "Components/PreGroupBox";
import roulettegif from "Img/roulette.gif";
import { thisExpression } from "@babel/types";

export class Roulette extends Component {
  constructor() {
    super();
    this.state = {
      rouletteMockOriginal: roulettemock,
      rouletteMockForUpdate: roulettemock,
      isClicked: true
    };
  }
  identifierMethod = e => {
    const currentInput = e.target.name;
    console.log(currentInput);
  };

  render() {
    console.log(roulettemock.groupMeals[2].length);

    let allInputs = [];
    if (this.state.rouletteMockForUpdate) {
      for (let i = 0; i < roulettemock.groupMeals.length; i++) {
        for (let j = 0; j < roulettemock.groupMeals[i].length; j++) {
          allInputs.push(
            <input
              name={`${i},${j}`}
              value={roulettemock.groupMeals[i][j]}
              onChange={this.identifierMethod}
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

          {/* {() => {
            for (let i = 0; i < roulettemock.groupMeals.length; i++) {
              for (let j = 0; j < roulettemock.groupMeals[i].length; j++) {
                return (
                  <input name={`${i}${j}`} onChange={this.identifierMethod} />
                );
              }
            }
          }} */}
          {allInputs}

          {/* {roulettemock.groupMeals.map((el1, idx1) => {
            el1.map((el2, idx2) => {
              return <input name={(idx1, idx2)} value={el2} />;
            });
          })} */}

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
