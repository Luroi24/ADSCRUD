import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Pregunta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            RGB: this.props.RGB
        }
    }

    handleClickEliminar = (event) => {
        //Eliminar
        axios.post(`http://localhost:8080/Crud/Eliminar?id=${this.state.id}`).then(response => {
            console.info(response.data);
            alert("Se elimino con exito");
        }).catch(error => {
            console.info(error);
            alert(response.data.message);
        }).finally(() => {
            window.location.href = "/Crud/";
        });
    }

    render() {
        const { id, RGB } = this.state;
        return (
            <tr>
                <td>{RGB}</td>
                <td className="AlignCenter">
                    <Link to={`/Crud/info?id=${id}`}>
                        <Button
                            variant="outline-success"
                            className="M-6">Ver color</Button>
                    </Link>
                    <Link to={`/Crud/Update?id=${id}`}>
                        <Button
                            variant="outline-warning"
                            className="M-6">Editar color</Button>
                    </Link>
                    <Button
                        variant="outline-danger"
                        className="M-6"
                        onClick={this.handleClickEliminar}>
                        Eliminar color
                    </Button>
                    <Link to={`/Crud/canva?id=${id}`}>
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
}

export default Pregunta;