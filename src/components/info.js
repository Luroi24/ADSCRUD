import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

class Info extends React.Component {

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

    render() {
        const { RGB,R,G,B,PREDICTION } = this.state;
        return (
            <Container className="MarginContainer">
                <h3>Informacion de la pregunta</h3>
                <p>Informacion: {RGB}</p>
                <p>Valor R: {R}</p>
                <p>Valor G: {G}</p>
                <p>Valor B: {B}</p>
                <p>Prediccion:{PREDICTION}</p>
                <Button variant="secondary" onClick={() => window.location.href = "/Crud/"}>
                    Regresar
                </Button>
            </Container>
        )
    }
}

export default Info;