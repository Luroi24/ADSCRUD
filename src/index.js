import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css"
import Info from "./components/info";
import Formulario from "./components/formulario";
import Update from "./components/update";
const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/Crud/">
                    <Home />
                </Route>
                <Route exact path="/Crud/info">
                    <Info />
                </Route>
                <Route exact path="/Crud/formulario">
                    <Formulario />
                </Route>
                <Route exact path="/Crud/update">
                    <Update />
                </Route>
                <Route path="*" render={() => <h1>Recurso no encontrado</h1>} />
            </Switch>
        </div>
    );
    // 
}
export default App;