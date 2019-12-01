import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "Pages/Signin";
import AdminPage from "Pages/AdminPage";
import EmployeeTable from "Pages/EmployeeTable";
import Roulette from "Pages/Roulette";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/adminpage" component={AdminPage} />
          <Route exact path="/employeetable" component={EmployeeTable} />
          <Route exact path="/roulette" component={Roulette} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
