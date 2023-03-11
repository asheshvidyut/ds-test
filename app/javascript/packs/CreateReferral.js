import React from "react";
import { render } from "react-dom";
import CreateReferral from "../components/CreateReferral";
import { BrowserRouter } from 'react-router-dom';

document.addEventListener("DOMContentLoaded", () => {
    render(
        <BrowserRouter>
            <CreateReferral />
        </BrowserRouter>,
        document.body.appendChild(document.createElement("div"))
    );
});