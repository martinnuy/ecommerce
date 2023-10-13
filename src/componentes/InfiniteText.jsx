import React from 'react'
import '../hojas-de-estilos/InfiniteText.css'

function InfiniteText() {

    const textRepeat = "I'm moving wiiiiii!";

  return (
    <div class="scrolling_text">
    <div class="text">
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
    <div class="text">
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