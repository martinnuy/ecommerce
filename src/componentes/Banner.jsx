import React from 'react';
import '../hojas-de-estilos/Banner.css';
import CachedImage from './CachedImage';

function Banner() {
  return (
    <div className='banner-div shadow-lg mb-5'>
        <CachedImage className='img-fluid' src={require('../imagenes/banner.png')} alt="" />
    </div>
  )
}

export default Banner