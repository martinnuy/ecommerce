import React from 'react'
import '../hojas-de-estilos/InfiniteText.css'

function InfiniteText(props) {

    const textRepeat = props.infiniteTextValue;

  return (
    <div className={`scrolling_text ${props.margin ? 'mt-8' : ''}`} >
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