import axios from "axios";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link , withRouter} from "react-router-dom";
import * as ml5 from "ml5";
import data from '../dataset/colorData.json';

let nn;
const options = {
    task: 'classification',
    debug: true
}
nn = ml5.neuralNetwork(options);

class Formulario extends React.Component {

    state = {
        valR: 0,
        valG: 0,
        valB: 0,
        prediccion: "Usa el boton Neural Network",
        disabled: true
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
        console.log(event.target.name + " = " + value);
        document.getElementById("cuadrito").style.backgroundColor = 'rgb(' + this.state.valR + ',' + this.state.valG + ',' + this.state.valB + ')';
        //------------------------------------------------------
        const input = {
            r: +this.state.valR,
            g: +this.state.valG,
            b: +this.state.valB
        }
        console.log(input.r);
        console.log(input.g);
        console.log(input.b);
        nn.classify(input, handleResults.bind(this));

        function handleResults(error, result) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(result); // {label: 'red', confidence: 0.8};
            console.log(`Color: ${result[0].label}, Seguridad de predicción: ${result[0].confidence.toFixed(2) * 100} por ciento`);
            const resultado = `${parseFloat(result[0].confidence).toFixed(2) * 100}% ${result[0].label}`;
            this.setState({prediccion: resultado});
        }
    }

    validar = (id, RGB, R, G, B, Pred) => {
        axios.post(encodeURI(`http://localhost:8080/Crud/Create?id=${id}&RGB=${RGB}&R=${R}&G=${G}&B=${B}&Pred=${Pred}`)).then(response => {
            console.info(response.data);
            console.log("Entro" + response);
            alert("Creado con exito");
        }).finally(() => {
            this.props.history.push('/Crud/home');
        });
    }

    handleClick(event) {
        this.setState({prediccion:"Espera"});
        // Step 4: add data to the neural network
        data.forEach(item => {
            const inputs = {
                r: item.r,
                g: item.g,
                b: item.b
            };
            const output = {
                color: item.label
            };

            nn.addData(inputs, output);
        });
        // Step 5: normalize your data;
        nn.normalizeData();
        // Step 6: train your neural network
        const trainingOptions = {
            epochs: 20,
            batchSize: 64
        }
        nn.train(trainingOptions, classify.bind(this));
        //------------------------------------------------------
       // Step 8: make a classification
       const input = {
            r: +this.state.valR,
            g: +this.state.valG,
            b: +this.state.valB
        }
        console.log(input.r);
        console.log(input.g);
        console.log(input.b);
        function classify() { nn.classify(input, handleResults.bind(this)); }
        // Step 9: define a function to handle the results of your classification
        function handleResults(error, result) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(result); // {label: 'red', confidence: 0.8};
            console.log(`Color: ${result[0].label}, Seguridad de predicción: ${result[0].confidence.toFixed(2) * 100} por ciento`);
            const resultado = `${parseFloat(result[0].confidence).toFixed(2) * 100}% ${result[0].label}`;
            this.setState({prediccion: resultado,disabled:false});
        }
    }

    render() {
        const style = {
            backgroundColor: 'rgb(' + this.state.valR + ',' + this.state.valG + ',' + this.state.valB + ')',
            border: '1px solid black',
            height: '50px',
            width: '100%',
        };

        return (
            <div>
                <div className="container-title">
                    <h1 className="vCenter animated-text">Neural Network Color Classifier </h1>
                </div>
                <div className="container-prin">
                    <Container className="MarginContainer container-tbl">
                        <h2 className="AlignCenter mb-3" > CREA TU COLOR </h2>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: "25ch" } }}>
                            <TextField id="identificador" label="Id" variant="standard" type="number" />
                            <TextField id="desc" label="Nombre" variant="standard" />
                            <TextField id="prediccion" label="Predicción" variant="standard" value={this.state.prediccion} disabled />
                        </Box>
                        <Box>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Box sx={{ width: "100%" }}>
                                    <div className="text-danger">Red:</div>
                                    <Slider
                                        name="valR"
                                        aria-label="Red"
                                        defaultValue={0}
                                        onChange={this.handleChange}
                                        color="error"
                                        valueLabelDisplay="auto"
                                        value={this.state.valR}
                                        step={1}
                                        min={0}
                                        max={255}
                                    />
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <div className="text-success">Green:</div>
                                    <Slider
                                        name="valG"
                                        aria-label="Green"
                                        defaultValue={0}
                                        onChange={this.handleChange}
                                        color="success"
                                        valueLabelDisplay="auto"
                                        value={this.state.valG}
                                        step={1}
                                        min={0}
                                        max={255}
                                    />
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <div className="text-info">Blue:</div>
                                    <Slider
                                        name="valB"
                                        aria-label="Blue"
                                        defaultValue={0}
                                        onChange={this.handleChange}
                                        valueLabelDisplay="auto"
                                        value={this.state.valB}
                                        color="info"
                                        step={1}
                                        min={0}
                                        max={255}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                        <div id="cuadrito" style={style}>
                        </div>
                        <Button variant="light" onClick={() =>
                            this.validar(document.getElementById("identificador").value, document.getElementById("desc").value, this.state.valR
                                , this.state.valG, this.state.valB, this.state.prediccion)} disabled={(this.state.disabled)? "disabled" : ""}>
                            <div className="CustomLink">Añadir</div>
                        </Button>
                        <Link to="/Crud/home">
                            <Button variant="light">
                                <div className="CustomLink">Regresar</div>
                            </Button>
                        </Link>
                        <Button name="Listo" type="button" variant="light" onClick={this.handleClick.bind(this)}>
                            <div className="CustomLink">Neural Network</div>
                        </Button>
                    </Container>
                </div>
            </div>
        )

    }
}

export default withRouter(Formulario);