/*------------------------------------------------------------------------------
Componente que muestra el login 
--------------------------------------------------------------------------------*/
import React from "react";
import $ from "jquery"
import Home from "./home"
import UserError from "./userError"
import '../styles/login.css'

class Login extends React.Component {
    
  state={
    val: 0,
  }
/*------------------------------------------------------------------------------
Validación de los datos del usuario. Se realiza una petición al servlet el cual hace una query a la base de datos. */
      validar=(usuario,password) =>{
        var datos={
            User: usuario,
            password: password
        }

        $.get("http://localhost:8080/Crud/Login",datos, (resultado)=>{
          if(resultado[0].usuario !="error"){
            this.state.val = 1;
          }else{
            this.state.val = 2;
          }
          this.forceUpdate();
        })
     
    }
/*------------------------------------------------------------------------------
Renderización del componente */
    render() {
      const undiv= <div className="d-grid" id="equis">
                    <div id="titulo">
                      <div className="center">
                        <div className="animated-text">Neural Network Color Classifier</div>
                        <div className="creditos">
                          <div className="creditosIn">
                          <p>[ Arteaga Hernández Angel Andrés(2021630136) - Ascencio Rangel Luis Eduardo (2021630137) - Guzman Cruz Andrés Miguel (2021630317) ]</p>
                          <p style={{fontWeight: 'bold'}}>5CM5 PF | 5CM52021630136IDPF</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="login" className="contenedor">
                    <div className="center">
                      <h1 className="AlignCenter" > Login </h1>
                        <div className="formulario">
                          <div class="form-group">
                            <label class="form-label" for="User">Usuario</label>
                            <input placeholder="Ingrese el usuario" type="text" id="User" class="form-control" />
                          </div>
                          <div class="form-group"><label class="form-label" for="password">Contraseña</label>
                            <input placeholder="Ingrese su contraseña" type="password" id="password" class="form-control" />
                          </div>
                          <button className="boton" onClick={() => this.validar(document.getElementById("User").value,document.getElementById("password").value)}>
                          Submit
                          </button>
                      </div>
                    </div>
                    </div>
            </div>
//    Dependiendo del valor del estado "val" se cargará un componente u otro. 
      const esValido = (this.state.val=='2')?<UserError></UserError>: (this.state.val=='1') ?<Home></Home>:undiv;
        return(
          <div>
            {esValido}
            {console.log(esValido)}
          </div>
        )    
  }
}
export default Login; 