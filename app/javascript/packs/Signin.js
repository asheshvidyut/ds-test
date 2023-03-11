import React from "react";
import { render } from "react-dom";
import SignInForm from "../components/SignInForm";

document.addEventListener("DOMContentLoaded", () => {
    render(
        <SignInForm />,
        document.body.appendChild(document.createElement("div"))
    );
});