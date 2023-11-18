import React, { useState } from "react";
import '../hojas-de-estilos/Nav.css';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart  } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import CachedImage from "./CachedImage";

function Nav(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

return(
  <nav className="navbar stroke navbar-expand-lg navbar-dark bg-dark fixed-top nav-wrap p-0 shadow-lg">
  
    <div className="line-div text-light">¡ ENVÍO GRATIS PARA PEDIDOS SUPERIORES $1500 !</div>

    <div className="container-fluid row mx-auto p-0" id="nav-row-div">
      

      <Link className="col-sm-12 col-md-4 col-lg-3 m-0 navbar-brand text-center" to="/">
        <CachedImage 
          className="logo"
          src={require('../imagenes/logo.png')} 
          alt="Logo" 
        />
      </Link>


      
      <div className={`col-md-4 collapse navbar-collapse justify-content-center ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">


        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item my-3 mx-3 nav-link" >
            <Link className="nav-link active text-center" aria-current="page" onClick={closeMenu} to="/ropa">ROPA</Link>
          </li>
          <li className="nav-item my-3 mx-3 nav-link">
            <Link className="nav-link active text-center" aria-current="page" onClick={closeMenu} to="/calzado">CALZADO</Link>
          </li>
          <li className="nav-item my-3 mx-3 nav-link">
            <Link className="nav-link active text-center" aria-current="page" onClick={closeMenu} to="/accesorios">ACCESORIOS</Link>
          </li>
          <li className="nav-item my-3 mx-3 nav-link">
            <Link className="nav-link active text-center" aria-current="page" onClick={closeMenu} to="/surf">SURF</Link>
          </li>
        </ul>

      </div>
      
      <div className="col-sm-12 col-md-4 col-lg-3 py-0 px-5 me-5 text-end" id="icons-section">
        <div className="d-flex justify-content-end align-items-center">
          <AiOutlineSearch className="nav-icons mx-2" />
          <AiOutlineShoppingCart className="nav-icons mx-2" />
          <Link to="/favoritos"> <AiOutlineHeart className="nav-icons mx-2" /> </Link>
          <AiOutlineUser className="nav-icons mx-2" />
          
          <button className={`navbar-toggler nav-hamb-button mb-1 me-1${!isMenuOpen ? ' collapsed' : ''}`} type="button" data-bs-toggle="collapse" onClick={toggleMenu} data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>
        </div>
      </div>

      

    </div>
  </nav>
);
}

export default Nav;