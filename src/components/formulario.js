import axios from "axios";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";



class Formulario extends React.Component {
    state={
        valR:"0",
        valG:"0",
        valB:"0"
    }
    
        validar=(id,RGB,R,G,B,Pred) =>{
            axios.post(`http://localhost:8080/Crud/Create?id=${id}&RGB=${RGB}&R=${R}&G=${G}&B=${B}&Pred=${Pred}`).then(response => {
                console.info(response.data);
                console.log("Entro"+response);
                alert("Creado con exito");
            }).finally(() => {
                window.location.href = "/Crud/";
            });
        }
    render() {

        const handleChange = (name) => (e, val) => {
            this.setState({[name]: val})
            console.log(name + " = " + this.state.name);
            document.getElementById("cuadrito").style.backgroundColor = 'rgb(' + this.state.valR + ',' + this.state.valG + ',' + this.state.valB + ')';
        };
        
        const style = {
            backgroundColor:'rgb(' + this.state.valR + ',' + this.state.valG + ',' + this.state.valB + ')',
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
                <h2 className="AlignCenter mb-3" > CREA TU COLOR </h2>
                <Box component="form" sx={{'& > :not(style)':{ m:1, width: "25ch" }}}>
                    <TextField id="identificador" label="Id" variant="standard" type="number"/>
                    <TextField id="desc" label="Nombre" variant="standard" />
                    <TextField id="prediccion" label="Predicción" variant="standard" />
                </Box>
                <Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Box sx={{width:"100%"}}>
                            <div className="text-danger">Red:</div>
                            <Slider
                                aria-label="Red"
                                defaultValue={0}
                                onChange={handleChange('valR')}
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
                                defaultValue={0}
                                onChange={handleChange('valG')}
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
                                aria-label="Blue"
                                defaultValue={0}
                                onChange={handleChange('valB')}
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
                <Button variant="light" onClick={() => 
                this.validar(document.getElementById("identificador").value,document.getElementById("desc").value,this.state.valR
                ,this.state.valG,this.state.valB,document.getElementById("prediccion").value)}>
                    <div className="CustomLink">Añadir</div>
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

export default Formulario;