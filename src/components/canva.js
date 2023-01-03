import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CanvasDraw from "react-canvas-draw";




class Canva extends React.Component {

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
                                    <div className="CustomLink">Limpiar pizarra</div>
                                </Button>
                                <Button variant="light"
                                    onClick={() => {
                                        this.saveableCanvas.undo();
                                    }}
                                >
                                    <div className="CustomLink">Deshacer</div>
                                </Button>
                                <CanvasDraw
                                    canvasWidth={400}
                                    canvasHeight={400}
                                    brushColor={styleC.color}
                                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                                />
                            </Box>
                        </Stack>
                        <Link to="/Crud/">
                            <Button variant="light">
                                <div className="CustomLink">Regresar</div>
                            </Button>
                        </Link>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Canva;