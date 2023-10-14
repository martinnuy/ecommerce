import React from "react";
import '../hojas-de-estilos/Nav.css';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart  } from 'react-icons/ai';


function Nav(){
return(
  <nav className="navbar stroke navbar-expand-lg navbar-dark bg-dark fixed-top nav-wrap p-0 shadow-lg">
  
    <div className="line-div text-light">FREE SHIPPING FOR US ORDERS OVER $99!</div>

    <div className="container-fluid">
      <a className="navbar-brand position-absolute" href="./">
        <img 
          className="logo"
          src={require('../imagenes/logo.png')} 
          alt="Logo" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item my-3 mx-3 nav-link" >
            <a className="nav-link active" aria-current="page" href="./ropa">ROPA</a>
          </li>
          <li className="nav-item my-3 mx-3 nav-link">
            <a className="nav-link active" aria-current="page" href="./calzado">CALZADO</a>
          </li>
          <li className="nav-item my-3 mx-3 nav-link">
            <a className="nav-link active" aria-current="page" href="./accesorios">ACCESORIOS</a>
          </li>
          <li className="nav-item my-3 mx-3 nav-link">
            <a className="nav-link active" aria-current="page" href="./surf">SURF</a>
          </li>
        </ul>
      </div>
      <div className="position-absolute bottom-5 end-0">
        <AiOutlineSearch className="nav-icons text-light mx-2" />
        <AiOutlineShoppingCart className="nav-icons text-light mx-2" />
        <AiOutlineHeart className="nav-icons text-light mx-2" />
        <AiOutlineUser className="nav-icons text-light mx-2" />
      </div>
    </div>
  </nav>
);
}

export default Nav;