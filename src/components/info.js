import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

class Info extends React.Component {

    state = {
        id: "",
        pregunta: "",
        respuesta: "",
        drags: [],
        targets: []
    }

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        if (qId) {
            axios.get("http://localhost:8080/Crud_React/Preguntas?id="+qId).then(response => {
                const question = response.data[0];
                this.setState({ ...question });
            }).catch(error => {
                console.info(error);
                alert("Ha ocurrido un error");
            });
        }
    }

    render() {
        const { pregunta, respuesta, drags, targets } = this.state;
        return (
            <Container className="MarginContainer">
                <h3>Informacion de la pregunta</h3>
                <p>Pregunta: {pregunta}</p>
                <p>Respuesta: {respuesta}</p>
                <p>Drag Options</p>
                <div className="AlignCenter">
                    {
                        drags.map(option => {
                            return (
                                <span className="M-6">
                                    <img src={option.imagen} className="ImageContainer" />
                                    <p>{option.valor}</p>
                                </span>
                            );
                        })
                    }
                </div>
                <p>Target Options</p>
                <div className="AlignCenter">
                    {
                        targets.map(target => {
                            return (
                                <span className="M-6">
                                    <img src={target.imagen} className="ImageContainer" />
                                    <p>{target.valor}</p>
                                </span>
                            );
                        })
                    }
                </div>
                <Button variant="secondary" onClick={() => window.location.href = "/Crud_React/"}>
                    Regresar
                </Button>
            </Container>
        )
    }
}

export default Info;