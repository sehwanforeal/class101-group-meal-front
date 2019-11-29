import React, { Component } from "react";
import "./GroupBox.scss";

export class GroupBox extends Component {
  render() {
    return (
      <div className="gb-body">
        {this.props.index + 1}
        <div className="gb-leader">{this.props.info[0]}</div>
        <div className="gb-member">{this.props.info[1]}</div>
        <div className="gb-member">{this.props.info[2]}</div>
        <div className="gb-member">{this.props.info[3]}</div>
        <div className="gb-member">{this.props.info[4]}</div>
      </div>
    );
  }
}

export default GroupBox;
