import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Pregunta = ({ id,RGB}) => {
    const handleClickEliminar = (event) => {
        //Eliminar
        axios.post(`http://localhost:8080/Crud/Eliminar?id=${id}`).then(response => {
            console.info(response.data);
        }).catch(error => {
            console.info(error);
            alert(response.data.message);
        }).finally(() => {
            window.location.href = "/Crud/";
        });
    }
    
    return (
        <tr>
            <td>{RGB}</td>
            <td className="AlignCenter">
                <Link to={`/Crud/info?id=${id}`}>
                    <Button
                    variant="outline-success"
                    className="M-6">Ver color</Button>
                </Link>
                <Link to={`/Crud/formulario?id=${id}`}>
                    <Button
                    variant="outline-warning"
                    className="M-6">Editar color</Button>
                </Link>
                <Button
                    variant="outline-danger"
                    className="M-6"
                    onClick={handleClickEliminar}>
                    Eliminar color
                </Button>
                <Link to={`/Crud/formulario?id=${id}`}>
                    <Button
                    variant="outline-info"
                    className="M-6">
                        Probar color
                    </Button>
                </Link>
            </td>
        </tr>
    )
}
export default Pregunta;