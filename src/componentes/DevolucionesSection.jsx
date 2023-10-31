import React from 'react'
import Nav from './Nav'
import Subtitulo from './Subtitulo'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function DevolucionesSection(props) {
  return (
    <div>

        <Nav />

        <div className='div-principal container'>

            <Subtitulo titulo="Política de devolución - Política de devolución de 30 días" />
            
            <p className='fs-5 mt-4'> ¿No está satisfecho con algo que ordenó? Tiene un período de devolución de 
            30 días después de recibir la mercancía. Siempre tienes derecho a cancelar tu compra si el producto está 
            agotado. La política de devolución se aplica a todo lo que hay en la tienda. Naturalmente no hay derecho a 
            devolución si el producto ha sido usado. Cuando recuperamos la mercancía y descubrimos que no está dañada, 
            pagamos dentro de los 30 días el monto que pagó, menos el costo de envío, si se devuelve el pedido completo.</p>

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

export default DevolucionesSection