import React from "react";
import { render } from "react-dom";
import SignUpForm from "../components/SignUpForm";

document.addEventListener("DOMContentLoaded", () => {
    render(
        <SignUpForm />,
        document.body.appendChild(document.createElement("div"))
    );
});