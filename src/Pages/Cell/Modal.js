import React from "react";

function Modal(props) {
  const {
    handleConfirm,
    handleChange,
    inputVal,
    deleteCell,
    cancelModal,
    createMode,
    createCell
  } = props;

  return (
    <div className="smallInput">
      <div className="title">
        {createMode ? "추가할 셀 이름" : "셀 이름을 변경하세요"}
      </div>
      <input onChange={handleChange} value={inputVal} />
      <div className="tools">
        <button onClick={!createMode ? handleConfirm : createCell}>확인</button>
        {!createMode && <button onClick={deleteCell}>삭제</button>}
        <button onClick={cancelModal}>취소</button>
      </div>
    </div>
  );
}

export default Modal;
