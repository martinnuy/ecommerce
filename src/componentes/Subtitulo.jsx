import React from 'react'
import '../hojas-de-estilos/Subtitulo.css'

function Subtitulo(props) {
  return (
    <div className='div-subtitulo mt-5 mb-4 pt-3 text-center'>
        <h2>{props.titulo}</h2>
    </div>
  )
}

export default Subtitulo