import React from 'react'
import '../hojas-de-estilos/ProductCard.css'

function ProductCard(props) {
  return (
    <a className='remove-link-style' href="./">
      <div className="card border-0 producto-slider" style={{width: '18rem'}}>
          
            <img className="card-img-top img-slider" src={require('../imagenes/prendas/destacados/'+ props.imgUrl)} alt="Card cap"/>

          <div className="card-body">
                <h5 className="card-title mb-1 color-link-style">{props.titulo.toUpperCase()}</h5>
              <p className="card-text mb-1">{props.tipo}</p>
              <h5 className="card-title">$ {props.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </h5>
          </div>
      </div>
    </a>
  )
}

export default ProductCard