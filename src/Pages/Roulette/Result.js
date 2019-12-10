import React from "react";
import Title from "./Title";
import Tables from "./Tables";
import loading from "Img/loading.gif";

export default function Result(props) {
  const { isClicked, rouletteMock, onClick, runRoulette, isLoading } = props;

  const sendAndReturn = () => {
    onClick();
  };

  // const isLoading = () => {
  //   if()
  // };

  const renderByClick = isClicked => {
    if (isLoading) {
      return (
        <div className="loading-section">
          <div className="loading-container">
            <img src={loading} alt="로딩중..." className="loading-img" />
            <div className="loading-description">
              점술판을 만드는 중입니다..
            </div>
          </div>
        </div>
      );
    } else if (isClicked) {
      return (
        <div className="rl-result">
          <Title title={"점술판 결과"} />
          <div className="rl-buttoncontainer">
            <button className="button-left" onClick={runRoulette}>
              점술판 다시돌리기
            </button>
            <button onClick={sendAndReturn} className="rl-confirm">
              확인
            </button>
          </div>

          <div className="rl-inputs-container">
            <Tables list={rouletteMock} />
            <div className="inputs-warning">확인을 누른후 캡쳐해주세요</div>
          </div>
        </div>
      );
    } else if (!isClicked) {
      return (
        <div className="rl-runsection">
          <div className="runsection-title">돌려돌려 점술판!!!</div>
          <button onClick={runRoulette} className="initRoulette">
            점술판 돌리기
          </button>
        </div>
      );
    }
  };

  return renderByClick(isClicked);
}
