import React from 'react'
import '../hojas-de-estilos/ShowImg.css'
import CachedImage from './CachedImage'

function ShowImg() {
  return (
    
        <div className='row p-5 mx-auto mt-5 showimg-div'>

            <div className='container col-md-6'>
                <a href="./"><CachedImage className='img-fluid pb-2 img-little' src={require('../imagenes/img-section/(2).jpg')} alt="" /></a>
                <a href="./"><CachedImage className='img-fluid pb-2 img-little' src={require('../imagenes/img-section/(3).jpg')} alt="" /></a>
            </div>

            <div className='container col-md-6'>
                <a href="./"><CachedImage className='img-fluid pb-2 img-big' src={require('../imagenes/img-section/(1).jpg')} alt="" /></a>
            </div>


        </div>


  )
}

export default ShowImg