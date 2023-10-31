import React from 'react'
import Nav from './Nav'
import Subtitulo from './Subtitulo'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function TerminosSection(props) {
  return (
    <div>

        <Nav />

        <div className='div-principal container'>

            <Subtitulo titulo="Terminos" />

            <p className='fs-5 mt-4 fw-bold mb-1'>Pago.</p>       
            <p className='fs-5'>Ofrecemos un método de pago seguro con tarjeta de crédito. Esto se realiza a través de una transferencia cifrada y segura, aprobada y verificada por VISA, MasterCard y American Express. Garantizamos que el pago es 100% seguro.</p> 
            <p className='fs-5'>Los precios incluyen el IVA. Nos reservamos el derecho de cambiar nuestros precios equivalentes. Los precios sólo pueden cambiarse según las circunstancias bajo el control de Shirtstore.se, como cambios sustanciales en los precios de las materias primas, fluctuaciones monetarias o un cambio del IVA.</p> 


            <p className='fs-5 mt-4 fw-bold mb-1'>Derecho de cambio / garantía / devolución.</p>
            <p className='fs-5'>Puedes cambiar sin cargo si cambias a otro color o talla. Si un producto es defectuoso o incorrecto, asumimos el envío. Comuníquese con el servicio de atención al cliente para obtener instrucciones.</p>
            
            <p className='fs-5 mt-4 fw-bold mb-1'>Tiempos de entrega.</p>
            <p className='fs-5'>Su pedido siempre se envía lo antes posible; a menudo, recibirá su producto en un plazo de 3 a 8 días. Sin embargo, la entrega puede tardar hasta dos semanas debido a una gran carga de trabajo o productos residuales.</p>

            <p className='fs-5 mt-4 fw-bold mb-1'>Información personal.</p>       
            <p className='fs-5'>DripDrop es un responsable del tratamiento de la información personal que usted como cliente nos deja. DripDrop tratará su información personal para gestionar las relaciones con los clientes y con fines de marketing. Los clientes menores de 18 años deben tener el consentimiento de sus padres para realizar pedidos.</p> 

            
            <p className='fs-5 mt-4 fw-bold mb-1'></p>       
            <p className='fs-5'></p> 


            <Link to="/">
                    <img 
                    className="logo invert-color mt-5"
                    src={require('../imagenes/logo.png')} 
                    alt="Logo" />
            </Link>
        
      </div>

      <Footer infiniteTextValue={props.infiniteTextValue}/>

    </div>
  )
}

export default TerminosSection