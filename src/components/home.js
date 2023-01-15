import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Pregunta from "./pregunta";
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "../styles/crud.css"

class Home extends React.Component {

    state = {
        data: [],
        showAlert: false,
        alertText: "",
        name:"",
        openDelete: false,
    }
    
    componentDidMount() {
        axios.get("http://localhost:8080/Crud/Preguntas").then(response => {
            this.setState({ data: response.data });
            console.log(response.data);
            console.log(this.state.data);
            this.forceUpdate();
        }).catch(error => {
            console.info(error);
            this.setState({ showAlert: true, alertText: "ERROR EN LA OBTENCION DE DATOS" });
        })
    }

    handleEliminar = (uId) => {
        //Eliminar
        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar este color?',
            buttons: [
              {
                label: 'Sí',
                onClick: () =>{
                    console.log(uId);
                    axios.post(`http://localhost:8080/Crud/Eliminar?id=${uId}`).then(response => {
                        console.info(response.data);
                        axios.get("http://localhost:8080/Crud/Preguntas").then(res => {
                            this.setState({ data: res.data });
                            console.log(res.data);
                            console.log("Nuevo array:" + this.state.data);
                            this.setState({openDelete:true});
                            this.forceUpdate();
                        }).catch(error => {
                            console.info(error);
                            this.setState({ showAlert: true, alertText: "ERROR EN LA OBTENCION DE DATOS" });
                        });
                    }).catch(error => {
                        console.info(error);
                        alert(response.data.message);
                    });
                }
              },
              {
                label: 'No'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    
    handleClose = () => {   
        this.setState({openDelete:false});
    };

    render() {
        const { data, showAlert, alertText } = this.state;
        const itemsPreguntas = data.map(pregunta => {
            return <Pregunta {...pregunta} reloadNeeded={this.handleEliminar} key={pregunta}/>
        })
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
                        <tbody key={this.state.data}>
                            {
                                itemsPreguntas
                            }
                        </tbody>
                    </Table>
                    <Snackbar open={this.state.openDelete} autoHideDuration={3000} onClose={this.handleClose}>
                        <MuiAlert onClose={this.handleClose} severity="success" sx={{ width: "100%" }} elevation={6} variant="filled">
                            Se ha eliminado con éxito
                        </MuiAlert>
                    </Snackbar>
                </Container>
                <div className="creditos">
                    <div className="creditosIn">
                        5CM5 | Realizado por : Arteaga Hernández Angel Andrés * Ascencio Rangel Luis Eduardo * Guzman Cruz Andrés Miguel
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default withRouter(Home);