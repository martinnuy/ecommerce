import React, {useState} from 'react'
import '../hojas-de-estilos/Nav.css';
import '../hojas-de-estilos/AdminLogin.css'
import { FaCheck, FaLock } from 'react-icons/fa';
import NavSimple from './NavSimple';
import { Link, useParams } from 'react-router-dom';

function NuevaContraseña() {
  const { token } = useParams();
  const [confirmado, setConfirmado] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password === repeatPassword){
        try {
            const response = await fetch( process.env.REACT_APP_API_URI + '/auth/setnewpassword/' + token , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
              });
      
            if (response.status === 200) {

              setMessage('Inicio de sesión exitoso.');
              setMessageColor('green');
              setConfirmado(true);
      
            } else {
              const errorData = await response.json();
              throw new Error(errorData.message);
            }
          } catch (error) {
            setMessage(error.message || 'Algo salio mal.');
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
            <div className="text-center p-5 shadow-lg login-div-adm" style={{maxWidth: '303px'}}>
                
                {
                    !confirmado ? (
                        <div>
                            <FaLock size="3em" color="#e91e63" />
                            <h2 className='pt-3'>Cambiar contraseña</h2>

                            <form id="login-form" onSubmit={handleSubmit}>

                                <div className="form-group py-3">
                                    <input 
                                        type="password" 
                                        id="passwordAdm" 
                                        name="password" 
                                        className="form-control" 
                                        placeholder='Nueva contraseña'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group py-3">
                                    <input 
                                        type="password" 
                                        id="repeatPasswordAdm" 
                                        name="repeatPassword" 
                                        className="form-control" 
                                        placeholder='Repetir contraseña'
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <button type="submit" className="btn btn-danger my-3 boton-login-adm">Enviar</button>
                            </form>

                            <div className='mt-2' style={{ color: messageColor }}>{message}</div>
                        </div>
                    ) : (
                        <div>
                                <FaCheck size="3em" color="#e91e63"/>
                                <h5 className='mt-4'>Su contraseña ha sido cambiada</h5>

                                <Link to="/login" className="btn btn-danger mt-3 boton-login-adm">Iniciar Sesion</Link>
                            </div>
                    )
                }

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

export default NuevaContraseña