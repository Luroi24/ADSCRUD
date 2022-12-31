import React from "react";
import { Button, Container } from "react-bootstrap";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField';


class Formulario extends React.Component {
    state = {
        val: ""
    }
    render() {
        const handleChange = (e, val) => {
            this.val = val;
            console.log(this.val);
          };
        
        return (
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
                </form>
                
                </Container>
                <Button variant="secondary" onClick={() =>
                    
                    window.location.href = "/Crud/"}>
                    Regresar
                </Button>
            </Container>
        )
    }
}

export default Formulario;