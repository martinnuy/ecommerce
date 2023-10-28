import React, {useState} from 'react'
import '../hojas-de-estilos/Nav.css';
import '../hojas-de-estilos/AdminLogin.css'
import {Link} from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

function AdminLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        setMessage('Inicio de sesión exitoso.');
        setMessageColor('green');

  
        window.location.reload();


      } else {
        throw new Error('Autenticación fallida');
      }
    } catch (error) {
      setMessage('Correo o contraseña incorrectos.');
      setMessageColor('red');
    }
  };

  

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

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group py-3">
                        <input 
                            type="email" 
                            id="emailAdm" 
                            name="email" 
                            className="form-control" 
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group py-3">
                        <input 
                            type="password" 
                            id="passwordAdm" 
                            name="password" 
                            className="form-control" 
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div><a className='link-dark-adm' href='/'>Recuperar Contraseña</a></div>
                    <button type="submit" className="btn btn-danger my-3 boton-login-adm">Iniciar sesión</button>
                </form>

                <div style={{ color: messageColor }}>{message}</div>
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