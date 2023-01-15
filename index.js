import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./src";
/* --------------------------------------------------------------
    Renderiza el HTML a la página web en donde se encuentra un elemento con el id "app"
*/
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
