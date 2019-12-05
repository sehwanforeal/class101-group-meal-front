import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "Pages/Signin";
import PreSignin from "Pages/PreSignin";
import AdminPage from "Pages/AdminPage";
import EmployeeTable from "Pages/EmployeeTable";
import Roulette from "Pages/Roulette";
import Cell from "Pages/Cell";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/employees" component={EmployeeTable} />
          <Route exact path="/roulette" component={Roulette} />
          <Route exact path="/cell" component={Cell} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
