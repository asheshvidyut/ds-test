import React from "react";
import Home from "../Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateReferral from "../CreateReferral";


export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create-referral" exact component={CreateReferral}/>
            <Route path="*" component={Home} />
        </Switch>
    </Router>
);