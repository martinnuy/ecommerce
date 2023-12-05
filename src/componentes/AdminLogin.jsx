import React, {useState} from 'react'
import '../hojas-de-estilos/Nav.css';
import '../hojas-de-estilos/AdminLogin.css'
import { FaLock } from 'react-icons/fa';
import NavSimple from './NavSimple';
import { Link } from 'react-router-dom';

function AdminLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch( process.env.REACT_APP_API_URI + '/auth/login', {
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
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setMessage(error.message || 'Algo salio mal.');
      setMessageColor('red');
    }
  };

  const validarEmail = (email) => {
    // Expresión regular para validar un formato de email básico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Utiliza el método test() de la expresión regular para verificar el formato
    return regex.test(email);
  }

  const recuperarContraseña = async () => {
    if( validarEmail(email) ){

      try {
        const response = await fetch( process.env.REACT_APP_API_URI + '/auth/resetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.status === 200) {

          setMessage('Se le ha enviado un correo para restablecer su contraseña.');
          setMessageColor('green');
  
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        setMessage(error.message || 'Algo salio mal.');
        setMessageColor('red');
      }

    }else{
      setMessage('Debes ingresar un correo para restablecer su contraseña.');
      setMessageColor('red');
    }
  }
  

  return (
    <div className='admBackground'>
        
        <NavSimple center='true' />

        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="text-center p-5 shadow-lg login-div-adm" style={{maxWidth: '303px'}}>
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
                    <div><Link className='link-dark-adm' to='' onClick={(e) => {e.preventDefault(); recuperarContraseña()}}>Recuperar Contraseña.</Link></div>
                    <button type="submit" className="btn btn-danger my-3 boton-login-adm">Iniciar sesión</button>
                    <div><Link className='link-dark-adm' to='/signup'>Crear una nueva cuenta.</Link></div>
                </form>

                <div className='mt-2' style={{ color: messageColor }}>{message}</div>
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