import axios from "axios";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField';



class Formulario extends React.Component {
    state={
        val:0

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
        const handleChange = (e, val) => {
            this.val = val;
            console.log(this.val);
          };
        
        return(
            <Container className="MarginContainer">
            <h1>CREA TU EJEMPLO</h1>
                <Box sx={{ width: 500 }}>
                    <TextField id="identificador" label="Id" variant="standard" sx={{ width: 150 }}/>
                    <TextField id="desc" label="Descripción" variant="standard" sx={{ width: 350 }}/>
                </Box>
                <Box sx={{ width: 300 }}>
                    <div className="text-danger">Red:</div>
                    <Slider
                        aria-label="Red"
                        defaultValue={0}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={255}
                    />
                    <div className="text-success">Green:</div>
                    <Slider
                        aria-label="Green"
                        defaultValue={0}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={255}
                    />
                    <div className="text-info">Green:</div>
                    <Slider
                        aria-label="Blue"
                        defaultValue={0}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={255}
                    />
                </Box>
            <Container>
            <form className="MarginContainer">
                <label>
                    id:
                </label>
                <input type="int" name="idc" id="id"/>
                <label>
                    Descripción:
                </label>
                <input type="text" name="RGB" id="RGB"/>
                <label>
                    R:
                </label>
                <input type="int" name="R" id="R"/>
                <label>
                    G:
                </label>
                <input type="int" name="G" id="G"/>
                <label>
                    B:
                </label>
                <input type="int" name="B" id="B"/>
                <label>
                    Predicción:
                </label>
                <input type="text" name="Pred" id="Pred"/>
            </form>
            
            </Container>
            <button className="boton" onClick={() => 
            this.validar(document.getElementById("id").value,document.getElementById("RGB").value,document.getElementById("R").value
            ,document.getElementById("G").value,document.getElementById("B").value,document.getElementById("Pred").value)}>
                      Submit
                      </button>
            <Button variant="secondary" onClick={() =>
                
                window.location.href = "/Crud/"}>
                Regresar
            </Button>
        </Container>
        )   
            
    }
}

export default Formulario;