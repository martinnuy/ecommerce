import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav';
import Subtitulo from './Subtitulo';
import Footer from './Footer';
import '../hojas-de-estilos/Pagar.css';
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../contexts/dataContext";


function Pagar(props) {
  const [metodoDePago, setMetodoDePago] = useState('');
  const [message, setMessage] = useState('');
  const { contextDataCart } = useContext(DataContext);
  const navigate = useNavigate();


  const funcionPagar = async (e) => {
    e.preventDefault();

    if (metodoDePago && contextDataCart > 0) {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URI + "/pagos/"+ metodoDePago +"/create-order",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
          const respuesta = await response.json();
          window.location.href = respuesta.message;

        } else {
          const errorData = await response.json();
          setMessage(errorData.message);
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  useEffect(() => {
    if(contextDataCart === 0){
      navigate('/');
    }
  }, [contextDataCart, navigate]);

  return (
    <div>
      <Nav />

      <div className="div-contenedor-productos">
        <Subtitulo titulo={props.titulo} />

        <div className="container mt-1 div-envios rounded d-flex justify-content-center align-items-center" style={{backgroundColor: '#ffffff00'}}>
          <div className="px-5 py-4">

              <form className="row justify-content-center" onSubmit={funcionPagar}>

                <div className={`col-md-4 bg-light rounded p-2 mx-1 shadow producto-slider${metodoDePago === 'mercadopago' ? ' boton-metodo-pago-active' : ''}`} 
                    onClick={() => setMetodoDePago('mercadopago')}
                >
                    <img className='img-fluid img-slider' src={require('../imagenes/mercadoPago.png')} alt="" />
                </div>

               
                <div
                  className="text-center mt-4"
                >
                  <button
                    className="btn btn-danger boton-login-adm"
                    type="submit"
                    //onClick={() =>{ navigate('/envio') }}
                  >
                    Pagar
                  </button>
                </div>
              </form>

            <div className="pb-2 mt-2 text-center" style={{ color: 'red' }}>
              {message}
            </div>
          </div>


        </div>
      </div>

      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  )
}

export default Pagar