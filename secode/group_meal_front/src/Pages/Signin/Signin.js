import React, { Component } from "react";
import "./Signin.scss";
import notfound from "Img/404.png";
import axios from "axios";
import { client_id, client_secret } from "config";

export class Signin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getQueryString = url => {
    const startIndex = url.indexOf("=") + 1;
    const endIndex = url.indexOf("&");

    const query =
      startIndex && endIndex ? url.slice(startIndex, endIndex) : null;

    return query;
  };

  //50ca812413faf339cd2848f42b8762dd
  //client_id=854668779588.857346823878
  componentDidMount() {
    this.fetchAuth();
  }

  fetchAuth = async () => {
    const code = this.getQueryString(window.location.href);
    const response =
      code &&
      (await axios(
        `http://10.0.6.43:3030/slack?code=${code}&${client_id}&${client_secret}`
      ));

    console.log("Im in fetch", response.message === "success");
  };
  //response.message === "success"{다음페이지로 푸쉬}
  //response.message !== "success"{404로 푸쉬}

  // componentDidMount() {
  // axios(
  //   "https://slack.com/oauth/authorize?scope=identity.basic,identity.email&client_id=854668779588.857346823878"
  // ).then(res => console.log(res));
  // }

  render() {
    console.log(client_secret);
    return (
      <div className="signin-body">
        <a
          href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email&${client_id}`}
        >
          <img
            alt="Sign in with Slack"
            // height="40"
            // width="172"
            height="160"
            width="600"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </div>
    );
  }
}

export default Signin;
