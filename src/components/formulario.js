import React from "react";
import { Button, Container } from "react-bootstrap";


class Formulario extends React.Component {

    render() {
        
        return (
            <Container className="MarginContainer">
                <h1>CREA TU EJEMPLO</h1>
                <Container>
                <form className="MarginContainer">
                    <label>
                        R:
                    </label>
                    <input type="int" name="R" id="R"/>
                    <label>
                        G:
                    </label>
                    <input type="int" name="G" id="G"/>
                    <label>
                        B:
                    </label>
                    <input type="int" name="B" id="B"/>
                </form>
                
                </Container>
                <Button variant="secondary" onClick={() =>
                    
                    window.location.href = "/Crud/"}>
                    Regresar
                </Button>
            </Container>
        )
    }
}

export default Formulario;