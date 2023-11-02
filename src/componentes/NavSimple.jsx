import React from 'react'
import {Link} from 'react-router-dom';
import CachedImage from './CachedImage';


function NavSimple(props) {
  return (
    <nav className="navbar stroke navbar-expand-lg navbar-dark bg-dark fixed-top nav-wrap p-0 shadow-lg">
        
            <div className="line-div text-light">BIENVENIDO</div>

            <div className={`row my-3 p-0${props.center ? ' mx-auto' : ' ms-3'}`} id="nav-row-div">
            
            <Link className="col-sm-12 col-md-4 col-lg-3 m-0 navbar-brand text-center" to="/">
                <CachedImage 
                className="logo"
                src={require('../imagenes/logo.png')} 
                alt="Logo" 
                />
            </Link>

            </div>
    </nav>
  )
}

export default NavSimple