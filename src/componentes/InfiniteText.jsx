import React from 'react'
import '../hojas-de-estilos/InfiniteText.css'

function InfiniteText() {

    const textRepeat = "👻 20% OFF CON EL CODIGO: OCTUBRE 👻";

  return (
    <div className="scrolling_text">
    <div className="text">
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
    </div>
    <div className="text">
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
        <span>{textRepeat}</span>
    </div>
    </div>
  )
}

export default InfiniteText