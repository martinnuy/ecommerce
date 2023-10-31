import React from 'react';
import '../hojas-de-estilos/Footer.css';
import InfiniteText from './InfiniteText';
import { Link } from 'react-router-dom';
import { AiOutlineClockCircle, AiOutlineEnvironment, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

function Footer(props) {
    
    const fecha = new Date();
    
  return (
    <div className="mt-5 pt-0 pb-5 footer shadow-lg">
        
        <InfiniteText infiniteTextValue={props.infiniteTextValue}/>
        
        <div className="container pt-4">
        <div className="row">
            <div className="col-lg-5 col-xs-12 about-company">

            <Link to="/">
                <img 
                className="logo"
                src={require('../imagenes/logo.png')} 
                alt="Logo" />
             </Link>

            <p className="pr-5 text-white-50 mt-2">
                Descubre la amplia gama de buzos y camisetas con estampados elegantes, divertidos y geniales que tenemos para ofrecerte.
            </p>
            <p className="pr-5 text-white-50">
            Desde diseños vintage hasta opciones retro y deportivas, en nuestro catálogo encontrarás prendas únicas. Tu satisfacción es nuestra prioridad, por eso te brindamos 
            una política de devolución de 30 días, métodos de pago seguros y una amplia variedad de opciones para que elijas con confianza.
            </p>
            <p><a href="./"><i className="fa fa-facebook-square mr-1"></i></a><a href="./"><i className="fa fa-linkedin-square"></i></a></p>
            </div>
            <div className="col-lg-3 col-xs-12 links">
            <h4 className="mt-lg-0 mt-sm-3">Información</h4>
                <ul className="m-0 p-0">
                <li className='footer-li my-2'><Link className='footer-link' to="/nosotros">Acerca de nosotros</Link></li>
                <li className='footer-li my-2'><Link className='footer-link' to="/terminos">Términos</Link></li>
                <li className='footer-li my-2'><Link className='footer-link' to="/preguntas">Preguntas más frecuentes</Link></li>
                <li className='footer-li my-2'><Link className='footer-link' to="/devoluciones">Devoluciones</Link></li>
                </ul>
            </div>
            <div className="col-lg-4 col-xs-12 location">
            <h4 className="mt-lg-0 mt-sm-4">Contacto</h4>
            <a className='footer-link' href="mailto:info@dripdrop.uy"> <AiOutlineMail size={20} /> info@dripdrop.uy</a>
            <p className="text-white-50 mb-0 mt-3"> <AiOutlinePhone size={20} /> (2) 512 12 12</p>
            <p className='text-white-50'> <AiOutlineEnvironment size={20} /> Galeria Uruguay, Av. 18 de Julio 966</p>
            <p className='text-white-50'> <AiOutlineClockCircle size={20} /> Lunes a Sábados de 9 a 21 hs / Domingos de 9 a 21 hs</p>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col copyright">
                <small className="text-white-50">© Copyright { fecha.getFullYear().toString() }.</small> 
                <p className="pt-2 text-center">
                    <small className="text-white-50">SITE BY <a className='footer-link' href="https://martinn.uy/" rel="noreferrer" target='_blank'>MN</a></small>
                </p>
            
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer