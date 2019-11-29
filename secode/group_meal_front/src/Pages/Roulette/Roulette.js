import React, { Component } from "react";
import "./Roulette.scss";
import Nav from "Components/Nav";
import roulettemock from "Data/roulettemock.js";
import GroupBox from "Components/GroupBox";

export class Roulette extends Component {
  constructor() {
    super();
    this.state = { rouletteMock: roulettemock };
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Nav />
        <div className="roulette-body">
          <div className="rl-title">돌려돌려 점술판!!</div>
          <div className="rl-result-container">
            {this.state.rouletteMock.groupMeals.map((el, idx) => {
              return <GroupBox info={el} index={idx} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Roulette;
