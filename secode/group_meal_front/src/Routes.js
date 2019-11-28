import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "Components/Signin";
import AdminPage from "Components/AdminPage";
import Employeetable from "Components/Employeetable";
import Roulette from "Components/Roulette";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/adminpage" component={AdminPage} />
          <Route exact path="/employeetable" component={Employeetable} />
          <Route exact path="/roulette" component={Roulette} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
