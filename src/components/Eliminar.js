import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link ,withRouter} from "react-router-dom";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

class Eliminar extends React.Component {

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
            this.state.PREDICTION = decodeURI(this.state.PREDICTION);
              }).catch(error => {
            console.info(error);
            alert(response.data.message);
             });
    }

    handleClickEliminar = () => {
        //Eliminar
        const uId = new URLSearchParams(window.location.search).get("id");
        console.log(uId);
        axios.post(`http://localhost:8080/Crud/Eliminar?id=${uId}`).then(response => {
            console.info(response.data);
            alert("Se elimino con exito");
        }).catch(error => {
            console.info(error);
            alert(response.data.message);
        }).finally(() => {
            this.props.history.push('/Crud/home');
        });
    }

    render() {
        const { RGB,R,G,B,PREDICTION } = this.state;
        const style = {
            backgroundColor: 'rgb(' + R + ',' + G + ',' + B + ')',
            border: '1px solid black',
            height: '100%',
            width: '100%',
          };

        return (
            <div>
            <div className="container-title">
                <h1 className="vCenter animated-text">Neural Network Color Classifier </h1>
            </div>
            <div className="container-prin">
                <Container className="MarginContainer container-tbl">
                <h2 className="AlignCenter mb-3" > DESEA ELIMINAR ESTE COLOR?</h2>
                <Stack direction={'row'} spacing={2}>
                    <Box sx={{width:"100%"}}>
                        <p>Nombre: {RGB}</p>
                        <p>Valor R: {R}</p>
                        <p>Valor G: {G}</p>
                        <p>Valor B: {B}</p>
                        <p>Predicción: {PREDICTION}</p>
                    </Box>
                    <Box sx={{width:"100%"}}>
                        <div id="cuadrito" style={style}> </div>
                    </Box>
                </Stack>
                    <Link to="/Crud/home">
                        <Button variant="light">
                            <div className="CustomLink">Regresar</div>
                        </Button>
                    </Link>
                    
                        <Button
                            variant="outline-danger"
                            className="M-6"
                            onClick={this.handleClickEliminar}>Eliminar color</Button>
                    

                </Container>
            </div>
            </div>
        )
    }

}

export default withRouter(Eliminar);