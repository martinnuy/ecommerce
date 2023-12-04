import React, {useState} from 'react'
import '../hojas-de-estilos/Nav.css';
import '../hojas-de-estilos/AdminLogin.css'
import { FaLock } from 'react-icons/fa';
import NavSimple from './NavSimple';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [recibirNovedadesPorEmail, setRecibirNovedadesPorEmail] = useState(false);

    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if(password === confirmPassword){  
        try {
            const response = await fetch( process.env.REACT_APP_API_URI + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, lastname, email, password, recibirNovedadesPorEmail }),
            });
    
            if (response.status === 201) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            setMessage('Registro exitoso.');
            setMessageColor('green');
    
        
            window.location.reload();
    
    
            } else {
            throw new Error('Autenticación fallida');
            }
        } catch (error) {
            setMessage('Algo salio mal.');
            setMessageColor('red');
        }
    }else{
        setMessage('La contraseña no coincide.');
        setMessageColor('red');
    }

    };

  return (
    <div className='admBackground'>
        
        <NavSimple center='true' />

        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="text-center p-5 shadow-lg login-div-adm">
                <FaLock size="3em" color="#e91e63" />
                <h2 className='pt-3'>Registrarme</h2>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group py-2">
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="form-control" 
                            placeholder='Nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group py-2">
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            className="form-control" 
                            placeholder='Apellido'
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group py-2">
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
                    <div className="form-group py-2">
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
                    <div className="form-group py-2">
                        <input 
                            type="password" 
                            id="repeatPasswordAdm" 
                            name="confirmPassword" 
                            className="form-control" 
                            placeholder='Repetir Contraseña'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-check text-start">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => setRecibirNovedadesPorEmail(!recibirNovedadesPorEmail)}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault" >
                            Recibir descuentos exclusivos y novedades por email.
                        </label>
                    </div>
                    <button type="submit" className="btn btn-danger my-3 boton-login-adm">Finalizar</button>
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

export default Signup