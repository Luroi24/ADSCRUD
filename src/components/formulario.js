/*------------------------------------------------------------------------------
Componente para agregar un nuevo color
--------------------------------------------------------------------------------*/
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "../styles/crud.css"

let nn;
const options = {
    task: 'classification',
    debug: true
}
nn = ml5.neuralNetwork(options);

class Formulario extends React.Component {

    state = {
        data: [],
        valR: 0,
        valG: 0,
        valB: 0,
        prediccion: "Usa el boton Neural Network",
        disabled: true,
        idError: false,
        helpTextId: "",
        openSuccess:false,
        openError:false,
        openWarning:false,
    }
/*------------------------------------------------------------------------------
    Se ejectua cada vez que se monta este componente. Se obitenen los datos que contiene la base de datos para poder hacer la validación del id.
*/
    componentDidMount() {
        axios.get("http://localhost:8080/Crud/Preguntas").then(response => {
            this.setState({ data: response.data });
            console.log(this.state.data);
            this.forceUpdate();
        }).catch(error => {
            console.info(error);
        })
    }
/*------------------------------------------------------------------------------
    Se realiza la validación del ID y se comprueba que se tenga una predicción brindada por la red neuronal. Si todo está en orden, entonces se agrega el color a la base de datos.
*/
    validar = (id, RGB, R, G, B, Pred) => {
        if(document.getElementById("identificador").value == ""){
            this.setState({idError:true,helpTextId:"Introduce un ID",openError:true})
            return;
        }

        if(this.state.disabled){
            this.setState({openWarning:true});
            return;
        }else if(!this.state.idError){
            axios.post(encodeURI(`http://localhost:8080/Crud/Create?id=${id}&RGB=${RGB}&R=${R}&G=${G}&B=${B}&Pred=${Pred}`)).then(response => {
                console.info(response.data);
                console.log("Entro" + response);
                this.setState({openSuccess:true});
            });
        }else{
            this.setState({openError:true});
        }   
    }
/*------------------------------------------------------------------------------
    Se evaluan los distitnos posibles estados del input del id. Si se introduce un id existente, entonces se activa el error
*/
    checkId = (event) => {
        this.setState({idError:false,helpTextId:""});
        const curId = event.target.value;
        if(curId == "") {
            this.setState({idError:true,helpTextId:"Introduce un ID"});
            return;
        }
        this.state.data.map(datos => {
            if(datos.id == curId) {
                console.log("Ya existe");
                this.setState({idError: true,helpTextId:"Ya existe este ID"});
                return;
            }
        });
    }
/*------------------------------------------------------------------------------
    Sección de handles. Sirven para realizar una acción tras un evento ocurrido.
    
    Handle change permite ver reflejados los cambios en las barras deslizadoras así como evaluar el color en la red neuronal entrenada.
*/
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

/*------------------------------------------------------------------------------
    handleClick permite entrenar la red neuronal. Es necesario ejecutar el entrenamiento cada vez que se quiera añadir un color
*/
    handleClick(event) {
        this.setState({prediccion:"Espera"});
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
        
        nn.normalizeData();
        
        const trainingOptions = {
            epochs: 20,
            batchSize: 64
        }
        nn.train(trainingOptions, classify.bind(this));
        //------------------------------------------------------
       
       const input = {
            r: +this.state.valR,
            g: +this.state.valG,
            b: +this.state.valB
        }
        console.log(input.r);
        console.log(input.g);
        console.log(input.b);
        function classify() { nn.classify(input, handleResults.bind(this)); }

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
/*------------------------------------------------------------------------------
    Handles para cerrar las alertas de éxito, error o aviso.
*/
    handleCloseSucc = () => {   
        this.setState({openSuccess:false});
        this.props.history.push('/Crud/home');
    };

    handleCloseErr = () => {   
        this.setState({openError:false});
    };

    handleCloseWarning = () => {   
        this.setState({openWarning:false});
    };

    render() {
        const style = {
            backgroundColor: 'rgb(' + this.state.valR + ',' + this.state.valG + ',' + this.state.valB + ')',
            border: '1px solid black',
            height: '50px',
            width: '100%',
        };
/*------------------------------------------------------------------------------
    Renderización del componente. Contiene las entradas necesarias para agregar un color.
*/
        return (
            <div>
                <div className="container-title">
                    <h1 className="vCenter animated-text">Neural Network Color Classifier </h1>
                </div>
                <div className="container-prin">
                    <Container className="MarginContainer container-tbl">
                        <h2 className="AlignCenter mb-3" > CREA TU COLOR </h2>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: "25ch" } }}>
                            <TextField id="identificador" label="Id" variant="standard" type="number" onBlur={this.checkId} error={this.state.idError} helperText={this.state.helpTextId}/>
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
                                , this.state.valG, this.state.valB, this.state.prediccion)}>
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
                        <Snackbar name="openSuccess" open={this.state.openSuccess} autoHideDuration={3000} onClose={this.handleCloseSucc}>
                            <MuiAlert name="openSuccess" onClose={this.handleCloseSucc} severity="success" sx={{ width: "100%" }} elevation={6} variant="filled">
                                Se ha creado con éxito
                            </MuiAlert>
                        </Snackbar>
                        <Snackbar name="openError" open={this.state.openError} autoHideDuration={3000} onClose={this.handleCloseErr}>
                            <MuiAlert name="openError" onClose={this.handleCloseErr} severity="error" sx={{ width: "100%" }} elevation={6} variant="filled">
                                Ha ocurrido un error: {this.state.helpTextId}
                            </MuiAlert>
                        </Snackbar>
                        <Snackbar name="openWarning" open={this.state.openWarning} autoHideDuration={3000} onClose={this.handleCloseWarning}>
                            <MuiAlert name="openWarning" onClose={this.handleCloseWarning} severity="warning" sx={{ width: "100%" }} elevation={6} variant="filled">
                                Primero presiona el botón de "Neural Network" para obtener tu predicción
                            </MuiAlert>
                        </Snackbar>
                    </Container>
                    <div className="creditos">
                    <div className="creditosIn">
                        5CM5 | Realizado por : Arteaga Hernández Angel Andrés - Ascencio Rangel Luis Eduardo - Guzman Cruz Andrés Miguel | 2023
                    </div>
                </div>
                </div>
            </div>
        )

    }
}

export default withRouter(Formulario);