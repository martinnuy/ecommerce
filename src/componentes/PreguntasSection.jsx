import React from 'react'
import Nav from './Nav'
import Subtitulo from './Subtitulo'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import '../hojas-de-estilos/PreguntasSection.css'

function PreguntasSection(props) {
  return (
    <div>

        <Nav />

        <div className='div-principal container'>

            <Subtitulo titulo="Preguntas frecuentes" />
            
            <div className="accordion accordion-flush" id="accordionPreguntas">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <p className='fs-6 fw-bold mb-0'>¿Cuál es el tiempo estimado de entrega de los productos?</p>
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionPreguntas">
                    <div className="accordion-body">
                        El tiempo de entrega varía según tu ubicación, pero generalmente nuestros envíos dentro de Uruguay suelen demorar entre 2 y 5 días hábiles. Si tienes alguna duda específica sobre tu pedido, no dudes en contactarnos para obtener información detallada.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <p className='fs-6 fw-bold mb-0'>¿Cuáles son las opciones de pago disponibles?</p>
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionPreguntas">
                    <div className="accordion-body">
                        Aceptamos diversas formas de pago, incluyendo tarjetas de crédito y débito, transferencias bancarias y pago en efectivo en algunos casos. Durante el proceso de compra, podrás elegir la opción que mejor te convenga.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <p className='fs-6 fw-bold mb-0'>¿Puedo realizar devoluciones o cambios si no estoy satisfecho con mi compra?</p>
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionPreguntas">
                    <div className="accordion-body">
                    Sí, en DripDrop valoramos tu satisfacción. Ofrecemos una política de devolución de 30 días. Si no estás contento con tu compra, puedes devolver el artículo en su estado original y te ayudaremos a procesar un cambio o un reembolso.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        <p className='fs-6 fw-bold mb-0'>¿Ofrecen descuentos o promociones especiales para clientes frecuentes?</p>
                    </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionPreguntas">
                    <div className="accordion-body">
                        ¡Claro que sí! En DripDrop valoramos a nuestros clientes leales. Mantente atento a nuestras promociones y suscríbete a nuestro boletín para recibir ofertas exclusivas, descuentos y noticias sobre nuevos productos.      
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        <p className='fs-6 fw-bold mb-0'>¿Cómo puedo contactar al servicio al cliente en caso de tener alguna consulta o problema?</p>
                    </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionPreguntas">
                    <div className="accordion-body">
                        Puedes contactarnos a través de nuestro correo electrónico.    
                    </div>
                    </div>
                </div>
                </div>

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

export default PreguntasSection