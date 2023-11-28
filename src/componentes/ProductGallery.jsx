import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import MostrarProductos from './MostrarProductos';
import Subtitulo from './Subtitulo';
import '../hojas-de-estilos/ProductGallery.css'

function ProductGallery(props) {

  return (
    <div>
        <Nav />

        <div className='div-contenedor-productos px-5'>
          
          <Subtitulo titulo={props.titulo}/>


          <MostrarProductos categoria={props.categoria} actualizarEnEntrar={props.actualizarEnEntrar} />


        </div>



        <Footer infiniteTextValue={props.infiniteTextValue}/>
    </div>
  )
}

export default ProductGallery