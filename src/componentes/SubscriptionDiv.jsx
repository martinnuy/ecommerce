import React, { useState } from 'react'
import '../hojas-de-estilos/SubscriptionDiv.css'
import { useNavigate } from 'react-router-dom';

function SubscriptionDiv() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(localStorage.getItem('token')){
            try {
                const response = await fetch( process.env.REACT_APP_API_URI + '/auth/emailnews', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email }),
                });
          
                if (response.status === 200) {
                  const respuesta = await response.json();
                  setMessage(respuesta.message);
                  setMessageColor('#f8f9fa');
          
                } else {
                  const errorData = await response.json();
                  throw new Error(errorData.message);
                }
              } catch (error) {
                setMessage(error.message || 'Algo salio mal.');
                setMessageColor('red');
              }
        }else{
            navigate('/login');
        }
      };

  return (
    <div className='subscription-div py-5'>
        <div className='container text-light text-center'>
            <h2 className='subscription-title'>
                Unite a la tripulación
            </h2>
            <p className='subscription-p'>
                Suscribite a nuestro boletín para ser el primero en enterarte de nuevos lanzamientos y ofertas exclusivas.
            </p>

            <form className='form-inline' onSubmit={handleSubmit}>
                <div className="form-group d-inline-block mb-2">
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control rounded-pill formSub-text" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Ingrese su Email" 
                        required
                    />
                </div>
                <button type="submit" className="btn btn-light mb-2 mx-3 d-inline-block rounded-pill formSub-text">Inscribirse</button>
            </form>

            <div className='mt-2' style={{ color: messageColor }}>{message}</div>
        </div>
    </div>
  )
}

export default SubscriptionDiv