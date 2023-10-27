import React from 'react'
import '../hojas-de-estilos/Nav.css';
import '../hojas-de-estilos/AdminLogin.css'
import {Link} from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

function AdminLogin() {
  return (
    <div className='admBackground'>
        <nav className="navbar stroke navbar-expand-lg navbar-dark bg-dark fixed-top nav-wrap p-0 shadow-lg">
        
            <div className="line-div text-light">BIENVENIDO</div>

            <div className="row mx-auto my-3 p-0" id="nav-row-div">
            
            <Link className="col-sm-12 col-md-4 col-lg-3 m-0 navbar-brand text-center" to="/">
                <img 
                className="logo"
                src={require('../imagenes/logo.png')} 
                alt="Logo" />
            </Link>

            </div>
        </nav>

        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="text-center p-5 shadow-lg login-div-adm">
                <FaLock size="3em" color="#e91e63" />
                <h2 className='pt-3'>Iniciar sesión</h2>
                <form id="login-form">
                <div className="form-group py-3">
                    <input type="email" id="email" name="email" className="form-control" placeholder='Email' required />
                </div>
                <div className="form-group py-3">
                    <input type="password" id="password" name="password" className="form-control" placeholder='Contraseña' required />
                </div>
                <div><a className='link-dark-adm' href='/'>Recuperar Contraseña</a></div>
                <button type="submit" className="btn btn-danger my-3 boton-login-adm">Iniciar sesión</button>
                </form>
                <div id="message" className="hidden"></div>
            </div>
        </div>

        
        <div className="py-2 footer shadow-lg fixed-bottom">
            <p className="mb-0 text-center">
                <small className="text-white-50">SITE BY <a className='footer-link' href="https://martinn.uy/" rel="noreferrer" target='_blank'>MN</a></small>
            </p>
        </div>
        
        
    </div>
  )
}

export default AdminLogin