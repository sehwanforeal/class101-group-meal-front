import React, { Component } from "react";
import "./Signin.scss";
import notfound from "Img/404.png";
import axios from "axios";

export class Signin extends Component {
  constructor() {
    super();
    this.state = {};
  }
  loginWithSlack = () => {
    axios(
      "https://slack.com/oauth/authorize?scope=identity.basic,identity.email&client_id=854668779588.857346823878"
    )
      .then(res => res.json())
      .catch(e => console.error("에러임", e));
  };
  render() {
    return (
      <div className="signin-body">
        <img className="signin-background" src={notfound} alt=""></img>

        <img
          alt="Sign in with Slack"
          height="40"
          width="172"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          onClick={this.loginWithSlack}
        />
      </div>
    );
  }
}

export default Signin;
