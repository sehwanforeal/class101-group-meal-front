import React, { Component } from "react";
import Title from "./Title";
import Result from "./Result";
import Nav from "Components/Nav";
import PreGroupBox from "Components/PreGroupBox";
import "./Roulette.scss";
// import roulettemock from "Data/roulettemock.js";
// import roulettemock2 from "Data/roulettemock2.js";
// import roulettegif from "Img/roulette.gif";

class Roulette extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      rouletteMock: [],
      // rouletteMockList: roulettemock.groupMeals.flat(),
      historyData: [],
      history2: [
        [2, 3],
        [4, 5]
      ],
      isAvailable: true,
      unAvailableName: "",
      isOverlapped: false,
      OverlappedName: "",
      isDataCame: false,
      isLoading: false
    };
  }

  componentDidMount() {
    fetch("http://10.0.0.247:3030/groupMeal/history", {
      method: "get"
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        this.setState({ historyData: res, isDataCame: true, isLoading: false });
        console.log(this.state.historyData);
      });
  }

  runRoulette = () => {
    this.setState({ isLoading: true });
    fetch("http://10.0.0.247:3030/groupMeal", {
      method: "get"
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.setState({ isClicked: true, rouletteMock: res, isLoading: false });
        console.log(this.state.rouletteMock);
      });
  };

  sendAndReturn = () => {
    fetch("http://10.0.0.247:3030/groupMeal", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupMeals: this.state.rouletteMock
      })
    })
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        console.log("respons", res);
        alert("점술판이 반영되었습니다");
        this.setState({
          isClicked: false
          // historyData: this.state.rouletteMock
        });
      });

    // const {
    //   isAvailable,
    //   isOverlapped,
    //   rouletteMock,
    //   OverlappedName,
    //   unAvailableName
    // } = this.state;

    // if (isAvailable && !isOverlapped) {
    //   this.setState({
    //     isClicked: false,
    //     previousData: rouletteMock
    //   });
    // } else if (isOverlapped) {
    //   alert("(" + OverlappedName + ")가 중복되었습니다!!");
    // } else {
    //   alert("(" + unAvailableName + ")는 없는 이름입니다!!");
    // }
  };

  // identifierMethod = (e, i, j) => {
  //   const { rouletteMock, rouletteMockList } = this.state;

  //   const value = e.target.value;
  //   const rouletteMockArr = rouletteMock.slice();
  //   const rl = rouletteMockList.slice();

  //   rouletteMockArr[i][j] = value;

  //   this.setState({ rouletteMock: rouletteMockArr });

  //   rl.indexOf(value) === -1
  //     ? this.setState({
  //         isAvailable: false,
  //         unAvailableName: value
  //       })
  //     : this.setState({ isAvailable: true });
  // };

  render() {
    const {
      rouletteMock,
      isClicked,
      historyData,
      history2,
      isDataCame,
      isLoading
    } = this.state;

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
              {isDataCame ? (
                historyData[0].history.map((el, idx) => {
                  return <PreGroupBox info={el} index={idx} />;
                })
              ) : (
                <div>no!!</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Roulette;
