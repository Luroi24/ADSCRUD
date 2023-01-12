import React from "react";
import '../styles/login.css'

class UserError extends React.Component {
    handleRefresh = () => {
        window.location.reload(false);
    }
    render() {
        
        return(<div className="contenedorErr">
                <div className="centerErr">
                    <div className="AlignCenter animated-text" > Usuario no válido </div>
                    <button className="buttonErr" onClick={this.handleRefresh}> Regresar </button>
                </div>
        </div>
        );
    }

}

export default UserError;