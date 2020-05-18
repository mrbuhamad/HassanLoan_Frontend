import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; /// check this later
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

//Components
import Navbar from "./Components/Webnavbar";
import PartList from "./Components/Participants/PartList";
import PartDetaile from "./Components/Detaile/PartDetaile";
import ActiveLoan from "./Components/Detaile/ActiveLoan";
import Home from "./Components/Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Redirect exact from="/" to="/home/" />
        <Route path="/home/" component={Home} />
        <Route path="/participants/" component={PartList} />
        <Route path="/ActiveLoans/" component={ActiveLoan} />
        <Route path="/Loans/:partID/" component={PartDetaile} />
      </Switch>
    </>
  );
}

export default withRouter(App);
