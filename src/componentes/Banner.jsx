import React from 'react';
import '../hojas-de-estilos/Banner.css';

function Banner() {
  return (
    <div className='banner-div shadow-lg'>
        <img className='img-fluid' src={require('../imagenes/banner.png')} alt="" />
    </div>
  )
}

export default Banner