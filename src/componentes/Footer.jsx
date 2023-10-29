import React from 'react';
import '../hojas-de-estilos/Footer.css';
import InfiniteText from './InfiniteText';
import { Link } from 'react-router-dom';

function Footer(props) {
    
    const fecha = new Date();
    
  return (
    <div className="mt-5 pt-0 pb-5 footer shadow-lg">
        
        <InfiniteText text={props.text}/>
        
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
                Tenemos la mayor selección de camisetas y sudaderas con estampados elegantes, divertidos y geniales! Vintage, retro, deportivo.
            </p>
            <p className="pr-5 text-white-50">
                Es importante para nosotros que usted quede satisfecho con su compra con nosotros. Por lo tanto, ofrecemos una política de devolución de 
                30 días, métodos de pago seguros y una gran selección para elegir.
            </p>
            <p><a href="./"><i className="fa fa-facebook-square mr-1"></i></a><a href="./"><i className="fa fa-linkedin-square"></i></a></p>
            </div>
            <div className="col-lg-3 col-xs-12 links">
            <h4 className="mt-lg-0 mt-sm-3">Información</h4>
                <ul className="m-0 p-0">
                <li className='footer-li my-2'><a className='footer-link' href="./">Acerca de nosotros</a></li>
                <li className='footer-li my-2'><a className='footer-link' href="./">Términos</a></li>
                <li className='footer-li my-2'><a className='footer-link' href="./">Preguntas más frecuentes</a></li>
                <li className='footer-li my-2'><a className='footer-link' href="./">Devoluciones</a></li>
                </ul>
            </div>
            <div className="col-lg-4 col-xs-12 location">
            <h4 className="mt-lg-0 mt-sm-4">Contacto</h4>
            <p className='text-white-50'>22, Lorem ipsum dolor, consectetur adipiscing</p>
            <p className='text-white-50'>Lunes a Sábados de 9 a 21 hs / Domingos de 9 a 21 hs</p>
            <p className="text-white-50 mb-0"><i className="fa fa-phone mr-3"></i>(541) 754-3010</p>
            <p className='text-white-50'><i className="fa fa-envelope-o mr-3"></i>info@hsdf.com</p>
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