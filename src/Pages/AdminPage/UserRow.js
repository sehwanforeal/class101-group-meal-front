import React, { Component } from "react";

export class UserRow extends Component {
  render() {
    const { info, submit } = this.props;

    return (
      <div className="user-row">
        <div className="user user-name">{info.name}</div>
        <div className="user user-email">{info.email}</div>
        <button
          onClick={(e, info) => {
            info = this.props.info;
            submit(info._id);
          }}
          className="user user-delete"
        >
          삭제
        </button>
      </div>
    );
  }
}

export default UserRow;
