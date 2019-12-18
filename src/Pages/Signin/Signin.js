import React, { Component } from "react";
import "./Signin.scss";
import Icon from "Components/Nav/Icon";
import axios from "axios";
import { url, client_id, client_secret } from "config";

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

  componentDidMount() {
    this.fetchAuth();
  }

  fetchAuth = async () => {
    const code = this.getQueryString(window.location.href);
    const response =
      code &&
      (await axios(`${url}slack?code=${code}&${client_id}&${client_secret}`));

    const access_token = response && response.data.access_token;
    if (access_token !== null) {
      sessionStorage.setItem("access_token", access_token);
      this.props.history.push("/roulette");
    }
  };

  render() {
    return (
      <div className="signin-body">
        <Icon />
        <span className="signin-span">EX ADMIN</span>
        <a
          href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email&${client_id}`}
        >
          <img
            alt="Sign in with Slack"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </div>
    );
  }
}

export default Signin;
