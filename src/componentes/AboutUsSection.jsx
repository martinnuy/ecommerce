import React from 'react'
import Nav from './Nav'
import Subtitulo from './Subtitulo'
import Footer from './Footer'
import { Link } from 'react-router-dom'

function aboutUsSection(props) {
  return (
    <div>
      <Nav/>

      <div className='div-principal container'>

        <Subtitulo titulo="Acerca de nosotros" />
        
        <p className='fs-5 mt-4'>Somos <strong>DripDrop</strong>, una pasión por la moda y la originalidad. Nuestra tienda de ropa, camisetas y accesorios nace con la idea de ofrecer a nuestros clientes una experiencia única y auténtica en el mundo de la vestimenta.</p>

        <p className='fs-5'>Creemos en la individualidad y en la expresión personal a través de la moda. Nuestra cuidadosa selección de camisetas y accesorios abarca desde estilos elegantes y clásicos hasta diseños divertidos y vanguardistas. Queremos que encuentres la prenda perfecta que refleje tu personalidad y estilo.</p>

        <p className='fs-5'>La calidad y la satisfacción del cliente son nuestros pilares fundamentales. Por eso, no solo ofrecemos productos de alta calidad, sino también un servicio excepcional. Contamos con una política de devolución de 30 días, múltiples opciones de pago seguras y un equipo amable y comprometido dispuesto a ayudarte en cada paso de tu elección.</p>

        <p className='fs-5'>No solo vendemos ropa y accesorios, vendemos la posibilidad de expresarte, destacarte y sentirte único. Únete a nosotros en esta emocionante travesía de la moda y descubre tu estilo personal. ¡Te damos la bienvenida a nuestra tienda con los brazos abiertos!</p>

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

export default aboutUsSection