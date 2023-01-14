import React from "react";
import { Button } from "react-bootstrap";
import { Link ,withRouter} from "react-router-dom";



class Pregunta extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            id: this.props.id,
            RGB: this.props.RGB
        }
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
                    <Link to={`/Crud/Eliminar?id=${id}`}>
                        <Button
                            variant="outline-danger"
                            className="M-6">Eliminar color</Button>
                    </Link>
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