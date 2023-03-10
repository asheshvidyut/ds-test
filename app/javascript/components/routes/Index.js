import React from "react";
import { render } from "react-dom";
import App from "../Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
        </Switch>
    </Router>
);