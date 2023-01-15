/*------------------------------------------------------------------------------
Componente para probar el color. Permite dibujar sobre una pizarra usando el color seleccionado
--------------------------------------------------------------------------------*/
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CanvasDraw from "react-canvas-draw";
import "../styles/crud.css"

class Canva extends React.Component {

    state = {
        id: "",
        RGB: "",
        R: "",
        G: "",
        B: "",
        PREDICTION: ""
    }
/*------------------------------------------------------------------------------
    Se ejectua cada vez que se monta este componente. Se obitenen los datos que coinciden con el id del color seleccionado para poder utilizar el color en el pincel de la pizarra.
*/
    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        console.log(qId);
        axios.post(`http://localhost:8080/Crud/Mostrar?id=${qId}`).then(response => {
            const question = response.data[0];
            console.info(response.data);
            this.setState({ ...question });
            this.state.PREDICTION = decodeURI(this.state.PREDICTION);
        }).catch(error => {
            console.info(error);
            alert(response.data.message);
        });
    }
/*------------------------------------------------------------------------------
    Renderización del componente. Se muestran los datos del color y permite al usuario dibujar sobre una pizarra usando el color seleccionado en el CRUD.
*/
    render() {
        const { RGB, R, G, B, PREDICTION } = this.state;

        const styleC = {
            color: 'rgb(' + R + ',' + G + ',' + B + ')',
        };

        return (
            <div>

                <div className="container-title">
                    <h1 className="vCenter animated-text">Neural Network Color Classifier </h1>
                </div>
                <div className="container-prin">
                    <Container className="MarginContainer container-tbl">
                        <h2 className="AlignCenter mb-3" > PRUEBA COLOR </h2>
                        <Stack direction={'row'} spacing={2}>
                            <Box sx={{ width: "100%" }}>
                                <p>Nombre: {RGB}</p>
                                <p>Valor R: {R}</p>
                                <p>Valor G: {G}</p>
                                <p>Valor B: {B}</p>
                                <p>Predicción: {PREDICTION}</p>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                                <Button variant="light"
                                    onClick={() => {
                                        this.saveableCanvas.eraseAll();
                                    }}
                                >
                                    Limpiar pizarra
                                </Button>
                                <Button variant="light"
                                    onClick={() => {
                                        this.saveableCanvas.undo();
                                    }}
                                >
                                    Deshacer
                                </Button>
                                <CanvasDraw
                                    canvasWidth={400}
                                    canvasHeight={400}
                                    brushColor={styleC.color}
                                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                                />
                            </Box>
                        </Stack>
                        <Link to="/Crud/home">
                            <Button variant="light">
                                <div className="CustomLink">Regresar</div>
                            </Button>
                        </Link>
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

export default Canva;