import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import MostrarProductos from './MostrarProductos';
import Subtitulo from './Subtitulo';
import '../hojas-de-estilos/ProductGallery.css'

function ProductGallery(props) {

    const infiniteTextValue = "👻 20% OFF CON EL CODIGO: OCTUBRE 👻";

  return (
    <div>
        <Nav />

        <div className='div-contenedor-productos px-5'>
          
          <Subtitulo titulo={props.titulo}/>


          <MostrarProductos categoria={props.categoria}/>


        </div>



        <Footer text={infiniteTextValue}/>
    </div>
  )
}

export default ProductGallery