import React, { useState } from "react";
import '../hojas-de-estilos/Nav.css';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart  } from 'react-icons/ai';
import { IoIosLogOut } from "react-icons/io";
import { CiShoppingTag } from "react-icons/ci";
import {Link, useNavigate} from 'react-router-dom';
import CachedImage from "./CachedImage";

function Nav(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    const searchBar = document.getElementById('collapseExample');

    if(searchBar.classList.contains('show')){
      searchBar.classList.remove('show');
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter' && document.getElementById('searchInput').value) {
      // Lógica que deseas ejecutar al presionar Enter
      navigate('/s/' + document.getElementById('searchInput').value);
    }
  };

  const logoutFunction = () => {
    localStorage.removeItem("token");
    navigate('/');
    window.location.reload();
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
          <AiOutlineSearch className="nav-icons mx-2" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={closeMenu}/>
          <Link to="/cart"> <AiOutlineShoppingCart className="nav-icons mx-2" /> </Link>
          <Link to="/favoritos"> <AiOutlineHeart className="nav-icons mx-2" /> </Link>
          
          {
            (localStorage.getItem('token')) ? (
              <div className="dropdown">
                <Link to="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> <AiOutlineUser className="nav-icons mx-2 dropdown-toggle" /> </Link>


                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-custom dropdown-menu-end">
                  <li><Link className="dropdown-item py-3" to="/user"> <AiOutlineUser className="nav-icons me-2 dropdown-toggle" />Mis Datos</Link></li>
                  <li><Link className="dropdown-item py-3" to=""> <CiShoppingTag className="nav-icons me-2" />Compras</Link></li>
                  <li><Link className="dropdown-item py-3" to="" onClick={logoutFunction}> <IoIosLogOut className="nav-icons me-2" />Cerrar Sesion</Link></li>
                </ul>
              </div>
            ) : (
            <Link to="/login" > <AiOutlineUser className="nav-icons mx-2 dropdown-toggle" /> </Link>
            )
          }
          
          <button className={`navbar-toggler nav-hamb-button mb-1 me-1${!isMenuOpen ? ' collapsed' : ''}`} type="button" data-bs-toggle="collapse" onClick={toggleMenu} data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>
        </div>
      </div>


    </div>
    <div className="collapse mx-auto mb-3 search-input-container" id="collapseExample">

        <AiOutlineSearch className="nav-icons mx-2" />
        <input className="search-input mb-2" id='searchInput' type="text" placeholder="Buscar" onKeyPress={handleEnter} autoComplete="off"/>

    </div>
  </nav>
);
}

export default Nav;