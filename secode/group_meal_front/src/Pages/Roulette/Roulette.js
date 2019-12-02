import React, { Component } from "react";
import Title from "./Title";
import Nav from "Components/Nav";
import PreGroupBox from "Components/PreGroupBox";
import roulettemock from "Data/roulettemock.js";
import roulettemock2 from "Data/roulettemock2.js";
import "./Roulette.scss";
import Result from "./Result";
// import roulettegif from "Img/roulette.gif";

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

  sendAndReturn = () => {
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

    const {
      isAvailable,
      isOverlapped,
      rouletteMock,
      OverlappedName,
      unAvailableName
    } = this.state;

    if (isAvailable && !isOverlapped) {
      this.setState({
        isClicked: false,
        previousData: rouletteMock
      });
    } else if (isOverlapped) {
      alert("(" + OverlappedName + ")가 중복되었습니다!!");
    } else {
      alert("(" + unAvailableName + ")는 없는 이름입니다!!");
    }
  };

  identifierMethod = (e, i, j) => {
    const { rouletteMock, rouletteMockList } = this.state;

    const value = e.target.value;
    const rouletteMockArr = rouletteMock.slice();
    const rl = rouletteMockList.slice();

    rouletteMockArr[i][j] = value;

    this.setState({ rouletteMock: rouletteMockArr });

    rl.indexOf(value) === -1
      ? this.setState({
          isAvailable: false,
          unAvailableName: value
        })
      : this.setState({ isAvailable: true });
  };

  render() {
    const { rouletteMock, isClicked, previousData } = this.state;

    return (
      <>
        <Nav />
        <div className="roulette-body">
          <Result
            isClicked={isClicked}
            rouletteMock={rouletteMock}
            onClick={this.sendAndReturn}
          />
          <div className="history-container">
            <Title title={"이전 점술판"} />
            <div className="rl-groupcontainer">
              {previousData.map((el, idx) => {
                return <PreGroupBox info={el} index={idx} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Roulette;
