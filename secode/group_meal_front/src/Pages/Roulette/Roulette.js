import React, { Component } from "react";
import "./Roulette.scss";
import Nav from "Components/Nav";

export class Roulette extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="roulette-body">
          <div className="rl-title">점술판</div>
        </div>
      </div>
    );
  }
}

export default Roulette;
