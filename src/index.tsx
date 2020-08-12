import React from "react";
import ReactDOM from "react-dom";
import CardForm from "./components/card-form";

const root = document.createElement("div");
root.id = "card-form-root";

document.body.appendChild(root);

ReactDOM.render(<CardForm />, root);