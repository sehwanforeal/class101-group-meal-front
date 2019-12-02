import React, { Component } from "react";
import "./Signin.scss";
import notfound from "Img/404.png";

export class Signin extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="signin-body">
        <img className="signin-background" src={notfound} alt=""></img>
        <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email&client_id=854668779588.857346823878">
          <img
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </div>
    );
  }
}

export default Signin;
