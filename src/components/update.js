import axios from "axios";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";


class Update extends React.Component {
    state = {
        id: "",
        RGB: "",
        R: "",
        G: "",
        B: "",
        PREDICTION: "",
    }
    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        axios.post(`http://localhost:8080/Crud/Mostrar?id=${qId}`).then(response => {
	        const question = response.data[0];                
 	        console.info(response.data);
	        this.setState({ ...question });
              }).catch(error => {
            console.info(error);
            alert(response.data.message);
             });
    }

        validar=(curId,id,RGB,R,G,B,Pred) =>{
            axios.post(`http://localhost:8080/Crud/Update?curId=${curId}&id=${id}&RGB=${RGB}&R=${R}&G=${G}&B=${B}&Pred=${Pred}`).then(response => {
                console.info(response.data);
                console.log("Entro"+response);
                alert("Se actualizo con exito");
            }).finally(() => {
                window.location.href = "/Crud/";
            });
        }
    render() {
        const qId = new URLSearchParams(window.location.search).get("id");
        const { R,G,B} = this.state;

        const handleChange = (name) => (e, val) => {
            this.setState({[name]: val})
            console.log("valG = " + this.state.name);
            document.getElementById("cuadrito").style.backgroundColor = 'rgb(' + this.state.R + ',' + this.state.G + ',' + this.state.B + ')';
        };
        
        const style = {
            backgroundColor: 'rgb(' + R + ',' + G + ',' + B + ')',
            border: '1px solid black',
            height: '50px',
            width: '100%',
          };

        return(
            <div>
            <div className="container-title">
                <h1 className="vCenter animated-text">Neural Network Color Classifier </h1>
            </div>
            <div className="container-prin">
                <Container className="MarginContainer container-tbl">
                <h2 className="AlignCenter mb-3" > MODIFICA TU COLOR </h2>
                <Container>
                <Box component="form" sx={{'& > :not(style)':{ m:1, width: "25ch" }}}>
                    <TextField id="identificador" label="Id" variant="standard" value={this.state.id} type="number" disabled/>
                    <TextField id="desc" label="Nombre" variant="standard" value={this.state.RGB} onChange={(event) => {this.setState({RGB: event.target.value})}}/>
                    <TextField id="prediccion" label="Predicción" variant="standard" value={this.state.PREDICTION} onChange={(event) => {this.setState({PREDICTION: event.target.value})}} />
                </Box>
                <Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Box sx={{width:"100%"}}>
                            <div className="text-danger">Red:</div>
                            <Slider
                                value={R}
                                aria-label="Red"
                                onChange={handleChange('R')}
                                color="error"
                                valueLabelDisplay="auto"
                                step={1}
                                min={0}
                                max={255}
                            />
                            
                        </Box>
                        <Box sx={{width:"100%"}}>
                            <div className="text-success">Green:</div>
                            <Slider
                                aria-label="Green"
                                value={G}
                                onChange={handleChange('G')}
                                color="success"
                                valueLabelDisplay="auto"
                                step={1}
                                min={0}
                                max={255}
                        />
                        </Box>
                        <Box sx={{width:"100%"}}>
                            <div className="text-info">Blue:</div>
                            <Slider
                                value={B}
                                aria-label="Blue"
                                onChange={handleChange('B')}
                                valueLabelDisplay="auto"
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
                </Container>
                <Button variant="light" onClick={() => 
                this.validar(qId,document.getElementById("identificador").value,document.getElementById("desc").value,this.state.R
                ,this.state.G,this.state.B,document.getElementById("prediccion").value)}>
                    <div className="CustomLink">Modificar</div>
                </Button>
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

export default Update;