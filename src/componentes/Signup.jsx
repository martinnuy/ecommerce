import React, {useState} from 'react'
import '../hojas-de-estilos/Nav.css';
import '../hojas-de-estilos/AdminLogin.css'
import { FaLock } from 'react-icons/fa';
import NavSimple from './NavSimple';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [recibirNovedadesPorEmail, setRecibirNovedadesPorEmail] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); 

    const [registroExitoso, setRegistroExitoso] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if(password === confirmPassword){  

        if(recaptchaValue){
            try {
                const response = await fetch( process.env.REACT_APP_API_URI + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastname, email, password, recibirNovedadesPorEmail, recaptchaValue }),
                });
        
                if (response.status === 201) {
                
                setRegistroExitoso(true);    

                //setMessage('Registro exitoso.');
                //setMessageColor('green');
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
            } catch (error) {
                setMessage(error.message || 'Algo salio mal.');
                setMessageColor('red');
            }
        }else{
            setMessage('Debes completar el reCAPTCHA');
            setMessageColor('red');
        }

    }else{
        setMessage('La contraseña no coincide.');
        setMessageColor('red');
    }

    };

    function onChange(value) {
        setRecaptchaValue(value);
      }

  return (
    <div className='admBackground'>
        
        <NavSimple center='true' />

        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="text-center p-5 shadow-lg login-div-adm">

                {!registroExitoso ? (
                    <div>
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
                        <div className="form-check text-start mt-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => setRecibirNovedadesPorEmail(!recibirNovedadesPorEmail)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault" >
                                Recibir descuentos exclusivos y novedades por email.
                            </label>
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-danger my-3 boton-login-adm">Finalizar</button>
                    </form>
                    </div>
                ):(
                    <div style={{maxWidth: '40vw'}}>
                        <FaLock size="3em" color="#e91e63" />
                        <h2 className='pt-3'>Confirme su dirección de correo electrónico</h2>
                        <h5 className='mt-4'>¡Gracias por unirte a DripDrop!</h5>
                        <p className='mt-4 mb-0'>Hemos enviado un correo con un link de activación a <span className='fw-bold'>{email}</span> </p>
                        <p>
                            Ten en cuenta que la verificación caducará, por lo que es crucial realizarla pronto para evitar inconvenientes.
                        </p>
                        <p>
                            <span className='fw-bold'>Si necesita reenviar el correo de verificación intente iniciar sesión con sus datos.</span>
                        </p>
                        <Link to="/login" className="btn btn-danger mt-3 boton-login-adm">Reenviar Correo</Link>
                    </div>
                    )
                    }

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