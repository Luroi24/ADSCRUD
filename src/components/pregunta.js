/*------------------------------------------------------------------------------
Componente que carga cada uno de los datos como filas de la tabla
--------------------------------------------------------------------------------*/
import React from "react";
import { Button } from "react-bootstrap";
import { Link ,withRouter} from "react-router-dom";


class Pregunta extends React.Component {
/*------------------------------------------------------------------------------    
    Constructor para facilitar el envio y recibimiento de parámetros externos.
*/
    constructor(props) {

        super(props);
        this.state = {
            id: this.props.id,
            RGB: this.props.RGB,
        }
    }
/*------------------------------------------------------------------------------   
    El botón eliminar ha sido presionado, se envía al padre para poder manipular al evento. 
*/
    handleClickEliminar = () => {
        this.props.reloadNeeded(this.state.id);
    }
/*------------------------------------------------------------------------------
    Renderización del componente. Aquí se carga cada uno de los datos obtenidos por el padre para mostrarlos en la tabla.
*/
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
                            className="M-6" onClick={this.handleClickEliminar}>Eliminar color</Button>
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

export default withRouter(Pregunta);