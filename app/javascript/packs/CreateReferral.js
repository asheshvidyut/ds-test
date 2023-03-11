import React from "react";
import { render } from "react-dom";
import CreateReferral from "../components/CreateReferral";

document.addEventListener("DOMContentLoaded", () => {
    render(
        <CreateReferral />,
        document.body.appendChild(document.createElement("div"))
    );
});