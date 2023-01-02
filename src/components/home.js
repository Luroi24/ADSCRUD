import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Pregunta from "./pregunta";
import "../styles/crud.css"

class Home extends React.Component {

    state = {
        data: [],
        showAlert: false,
        alertText: "",
        name:""
    }
    
    componentDidMount() {
        axios.get("http://localhost:8080/Crud/Preguntas").then(response => {
            this.setState({ data: response.data });
            console.log(response.data);
            console.log(this.state.data);
        }).catch(error => {
            console.info(error);
            this.setState({ showAlert: true, alertText: "ERROR EN LA OBTENCION DE DATOS" });
        })
    }

    render() {
        const { data, showAlert, alertText } = this.state;
        return (
            <div>
            <div className="container-title">
                <h1 className="vCenter animated-text">Neural Network Color Classifier </h1>
            </div>
            <div className="container-prin">
                <Container className="MarginContainer container-tbl">
                    <h2 className="AlignCenter" > LISTA DE COLORES GUARDADOS </h2>
                    <hr style={{ width: "80%" }} />
                    {
                        showAlert ?
                            <Alert variant="danger">
                                {alertText}
                            </Alert>
                            : null
                    }
                    <Link to="/Crud/formulario">
                        <Button variant="light">
                            <div className="CustomLink">Añadir nuevo color</div>
                        </Button>
                    </Link>
                    <Table striped bordered>
                        <thead className="thead-dark">
                            <tr>
                                <th>Color</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(pregunta => {
                                    return <Pregunta {...pregunta} />
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
            </div>
        )
    }

}

export default Home;