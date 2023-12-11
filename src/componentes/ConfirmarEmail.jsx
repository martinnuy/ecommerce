import React, {useState} from 'react'
import '../hojas-de-estilos/Nav.css';
import '../hojas-de-estilos/AdminLogin.css'
import { FaCheck, FaTimes  } from 'react-icons/fa';
import NavSimple from './NavSimple';
import { Link, useParams } from 'react-router-dom';
import LoadSpinner from './LoadSpinner';
import { useQuery } from 'react-query';

function ConfirmarEmail() {
    const { token } = useParams();
    const [confirmado, setConfirmado] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); 

    const confirmarCorreo = async () => {
      try {
        // Realizar una solicitud al servidor para confirmar el correo electrónico
        const response = await fetch( process.env.REACT_APP_API_URI + '/auth/confirmaremail/' + token , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        if (response.status === 200) {
            const respuesta = await response.json();
            if(respuesta.titulo){
              setTitulo(respuesta.titulo);
              setMessage(respuesta.message);
            }
            setConfirmado(true);
            setIsLoading(false);  
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
      } catch (error) {
        setIsLoading(false);
        setMessage(error.message || 'Algo salio mal.');
        setMessageColor('red');
        // Manejar errores
      }
    };

  // Utiliza React Query
    useQuery(
    ['confirmarCorreo'],
    () => confirmarCorreo(),
    {
      staleTime: 60000, // Establece el período de caché en 10 segundos
    }
  );
      
  return (
    <div className='admBackground'>
        
        <NavSimple center='true' />

        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="text-center p-5 shadow-lg login-div-adm">

                    <div style={{maxWidth: '40vw'}}>
                        {confirmado ? (
                            <div>
                                <FaCheck size="3em" color="#e91e63"/>

                                <h2 className='pt-3'>{ titulo ? titulo : 'Su correo ha sido verificado' }</h2>
                                <h5 className='mt-4'>{ titulo ? message : '¡Gracias por unirte a DripDrop!' }</h5>

                                <Link to="/login" className={`btn btn-danger mt-3 boton-login-adm${titulo ? ' d-none' : ''}`}>Iniciar Sesion</Link>
                            </div>
                        ) : (

                            isLoading ?(
                                <div>
                                    <div ><LoadSpinner center='true' small='true' /></div>
                                    <p className='m-0'>Confirmando...</p>
                                </div>
                            ):(
                                <div>
                                    <FaTimes size="3em" color="#e91e63" />
                                    <h2 className='pt-3'>Ha ocurrido un error:</h2>
                                    <h5 className='mt-4' style={{ color: messageColor }}>{message}</h5>
                                </div>
                            )

                        )}

                        
                    </div>

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

export default ConfirmarEmail