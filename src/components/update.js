import axios from "axios";
import React from "react";
import { Button, Container } from "react-bootstrap";



class Update extends React.Component {
    state = {
        id: "",
        RGB: "",
        R: "",
        G: "",
        B: "",
        PREDICTION: ""
    }

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        console.log(qId);
        axios.post(`http://localhost:8080/Crud/Mostrar?id=${qId}`).then(response => {
	        const question = response.data[0];                
 	        console.info(response.data);
	        this.setState({ ...question });
              }).catch(error => {
            console.info(error);
            alert(response.data.message);
             });
    }

        validar=(id,RGB,R,G,B,Pred) =>{
            axios.post(`http://localhost:8080/Crud/Update?id=${id}&RGB=${RGB}&R=${R}&G=${G}&B=${B}&Pred=${Pred}`).then(response => {
                console.info(response.data);
                console.log("Entro"+response);
                alert("Se Actualizo con exito");
            });
        }
    render() {
         const { id,RGB,R,G,B,Pred } = this.state;
        return(
            <Container className="MarginContainer">
            <h1>CREA TU EJEMPLO</h1>
            <Container>
            <form className="MarginContainer">
                <label>
                    id:
                </label>
                <input type="number" name="idc" id="id" value={id}/>
                <label>
                    Descripción:
                </label>
                <input type="text" name="RGB" id="RGB" defaultValue={RGB}/>
                <label>
                    R:
                </label>
                <input type="number" name="R" id="R" defaultValue={R}/>
                <label>
                    G:
                </label>
                <input type="number" name="G" id="G" defaultValue={G}/>
                <label>
                    B:
                </label>
                <input type="nummber" name="B" id="B" defaultValue={B}/>
                <label>
                    Predicción:
                </label>
                <input type="text" name="Pred" id="Pred" defaultValue={Pred}/>
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

export default Update;