import React from "react";
import Title from "./Title";
import Tables from "./Tables";

export default function Result(props) {
  const { isClicked, rouletteMock, onClick } = props;

  const sendAndReturn = () => {
    onClick();
  };

  const renderByClick = isClicked => {
    return isClicked ? (
      <div className="rl-result">
        <Title title={"점술판 결과"} />
        <div className="rl-buttoncontainer">
          <button onClick={sendAndReturn} className="rl-confirm">
            확인
          </button>
        </div>
        <div className="rl-inputs-container">
          <Tables list={rouletteMock} />
        </div>
      </div>
    ) : (
      <div className="rl-runsection">
        <div className="runsection-title">돌려돌려 점술판!!!</div>
      </div>
    );
  };

  return renderByClick(isClicked);
}
