import React from "react";
import '../hojas-de-estilos/Nav.css';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart  } from 'react-icons/ai';


function Nav(){
return(
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top nav-wrap p-0 shadow-lg">
  
    <div className="line-div"></div>

    <div class="container-fluid">
      <a class="navbar-brand position-absolute" href="#">
        <img 
          className="logo"
          src={require('../imagenes/logo.png')} 
          alt="Logo" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item my-3">
            <a class="nav-link active" aria-current="page" href="#">Ropa</a>
          </li>
          <li class="nav-item my-3">
            <a class="nav-link active" aria-current="page" href="#">Calzado</a>
          </li>
          <li class="nav-item my-3">
            <a class="nav-link active" aria-current="page" href="#">Accesorios</a>
          </li>
          <li class="nav-item my-3">
            <a class="nav-link active" aria-current="page" href="#">Surf</a>
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