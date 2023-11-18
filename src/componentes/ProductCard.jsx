import React from 'react'
import '../hojas-de-estilos/ProductCard.css'
import CachedImage from './CachedImage'
import { Link } from 'react-router-dom'

function ProductCard(props) {
  return (
    <div className="card border-0 producto-slider mx-auto" style={{width: '18rem'}}>
        <Link className='remove-link-style' to={'/p/' + props.slug}>
            <CachedImage className="card-img-top img-slider" src={ props.imgUrl } alt="Card cap" blurImage={props.blurImage} />

          <div className="card-body">
                <h5 className="card-title mb-1 color-link-style">{props.titulo.toUpperCase()}</h5>
              <p className="card-text mb-1">{props.tipo.charAt(0).toUpperCase() + props.tipo.slice(1)}</p>
              <h5 className="card-title">$ {props.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </h5>
          </div>
        </Link>
      </div>
  )
}

export default ProductCard