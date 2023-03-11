import React from "react";
import { render } from "react-dom";
import Home from "../Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
        </Switch>
    </Router>
);