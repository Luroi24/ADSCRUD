import axios from "axios";
import React from "react";
import { Button, Container } from "react-bootstrap";



class Formulario extends React.Component {
    state={
        val:0

    }
        validar=(id,RGB,R,G,B,Pred) =>{
            axios.post(`http://localhost:8080/Crud/Create?id=${id}&RGB=${RGB}&R=${R}&G=${G}&B=${B}&Pred=${Pred}`).then(response => {
                console.info(response.data);
                console.log("Entro"+response);
                alert("Creado con exito");
            }).finally(() => {
                window.location.href = "/Crud/";
            });
        }
    render() {
        
        return(
            <Container className="MarginContainer">
            <h1>CREA TU EJEMPLO</h1>
            <Container>
            <form className="MarginContainer">
                <label>
                    id:
                </label>
                <input type="int" name="idc" id="id"/>
                <label>
                    Descripción:
                </label>
                <input type="text" name="RGB" id="RGB"/>
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
                <label>
                    Predicción:
                </label>
                <input type="text" name="Pred" id="Pred"/>
            </form>
            
            </Container>
            <button className="boton" onClick={() => 
            this.validar(document.getElementById("id").value,document.getElementById("RGB").value,document.getElementById("R").value
            ,document.getElementById("G").value,document.getElementById("B").value,document.getElementById("Pred").value)}>
                      Submit
                      </button>
            <Button variant="secondary" onClick={() =>
                
                window.location.href = "/Crud/"}>
                Regresar
            </Button>
        </Container>
        )   
            
    }
}

export default Formulario;