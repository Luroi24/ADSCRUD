import React from "react";
import $ from "jquery"
import Home from "./home"
import UserError from "./userError"
import '../styles/login.css'

class Login extends React.Component {
    
  state={
    val: 0,
  }

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
    render() {
      const undiv= <div className="d-grid" id="equis">
                    <div id="titulo">
                      <div className="center">
                        <div className="animated-text">Neural Network Color Classifier</div>
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
                          <div class="form-group"><label class="form-label" for="password">Password</label>
                            <input placeholder="Ingrese su contraseña" type="password" id="password" class="form-control" />
                          </div>
                          <button className="boton" onClick={() => this.validar(document.getElementById("User").value,document.getElementById("password").value)}>
                          Submit
                          </button>
                      </div>
                    </div>
                    </div>
            </div>
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