import React, { Component } from "react";
import "./Roulette.scss";
import Nav from "Components/Nav";
import roulettemock from "Data/roulettemock.js";
import roulettemock2 from "Data/roulettemock2.js";
import PreGroupBox from "Components/PreGroupBox";
import roulettegif from "Img/roulette.gif";

export class Roulette extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: true,
      rouletteMock: roulettemock.groupMeals,
      rouletteMockList: roulettemock.groupMeals.flat(),
      previousData: roulettemock2.groupMeals,
      isAvailable: true,
      unAvailableName: "",
      isOverlapped: false,
      OverlappedName: ""
    };
  }

  // componentDidMount = () => {
  //   fetch("이전돌림판기록", {
  //     method: "get"
  //   })
  //     .then(function(res) {
  //       return res.json();
  //     })
  //     .then(res => {
  //       //console.log(res.data);
  //       let previousdata = res.data;
  //       this.setState({ previousData: previousdata });
  //     });
  // };
  runRoulette = () => {
    // fetch("로직돌린점술판", {
    //   method: "get"
    // })
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(res => {
    //     //console.log(res.data);
    //     let roulettemockReal = res.data;
    //     this.setState({ isClicked: true, rouletteMock: roulettemockReal });
    //   });
    this.setState({ isClicked: true });
  };

  sendAndretrun = () => {
    // fetch("수정끝난거", {
    //   method: "post",
    //   body: JSON.stringify({
    //     email: this.state.idValue,
    //     password: this.state.pwValue,
    //     summoner_name: this.state.nameValue
    //   })
    // })
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(res => {
    //     this.setState({
    //       previousData: this.state.rouletteMock,
    //       isClicked: false
    //     });
    //     alert("점술판이 반영되었습니다");
    //   });
    if (this.state.isAvailable && !this.state.isOverlapped) {
      this.setState({
        isClicked: false,
        previousData: this.state.rouletteMock
      });
    } else if (this.state.isOverlapped) {
      alert("(" + this.state.OverlappedName + ")가 중복되었습니다!!");
    } else {
      alert("(" + this.state.unAvailableName + ")는 없는 이름입니다!!");
    }
  };

  identifierMethod = (e, i, j) => {
    console.log(e.target.value);
    const rouletteMockArr = this.state.rouletteMock.slice();
    const rl = this.state.rouletteMockList.slice();
    rouletteMockArr[i][j] = e.target.value;
    this.setState({ rouletteMock: rouletteMockArr });
    if (rl.indexOf(e.target.value) === -1) {
      this.setState({ isAvailable: false, unAvailableName: e.target.value });
    } else {
      this.setState({ isAvailable: true });
    }
  };

  classNameFinder = j => {
    if (j === 0) {
      return "input-leader";
    } else if (j === 1) {
      return "input-second";
    } else if (j === 4) {
      return "input-last";
    } else {
      return "input-normal";
    }
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
              className={this.classNameFinder(j)}
            />
          );
        }
      }
    }
    console.log(this.state.isAvailable);
    return (
      <div>
        <Nav />
        <div className="roulette-body">
          <div className="rl-empty"></div>

          {this.state.isClicked ? (
            <div className="rl-result">
              <div className="rl-uppercontainer">
                <div className="rl-title">점술판 결과</div>
              </div>
              <div className="rl-buttoncontainer">
                <button onClick={this.sendAndretrun} className="rl-confirm">
                  확인
                </button>
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
                onClick={this.runRoulette}
              ></img>
            </div>
          )}

          <div className="history-container">
            <div className="rl-uppercontainer">
              <div className="rl-title">이전 점술판</div>
            </div>
            <div className="rl-groupcontainer">
              {this.state.previousData.map((el, idx) => {
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
