import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "Pages/Signin";
import PreSignin from "Pages/PreSignin";
import AdminPage from "Pages/AdminPage";
import EmployeeTable from "Pages/EmployeeTable";
import Roulette from "Pages/Roulette";
import Cell from "Pages/Cell";
import AssortItems from "Pages/AssortItems";
import EntireItems from "Pages/EntireItems";
import RentalStatus from "Pages/RentalStatus";
import StockStatus from "Pages/StockStatus";
import WastedItems from "Pages/WastedItems";
import AddItem from "Pages/AddItem";
import ModifyItem from "Pages/ModifyItem";
import AddType from "Pages/AddType";
import ModifyType from "Pages/ModifyType";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PreSignin} />
          {/* <Route exact path="/admin" component={AdminPage} /> */}
          <Route exact path="/employees" component={EmployeeTable} />
          <Route exact path="/roulette" component={Roulette} />
          <Route exact path="/cell" component={Cell} />
          <Route exact path="/assortitems" component={AssortItems} />
          <Route exact path="/entireitems" component={EntireItems} />
          <Route exact path="/rentalstatus" component={RentalStatus} />
          <Route exact path="/stockstatus" component={StockStatus} />
          <Route exact path="/wasteditems" component={WastedItems} />
          <Route exact path="/additem" component={AddItem} />
          <Route exact path="/modifyitem" component={ModifyItem} />
          <Route exact path="/addtype" component={AddType} />
          <Route exact path="/modifytype" component={ModifyType} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
