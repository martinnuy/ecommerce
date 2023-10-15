import React from 'react'

function ProductCard(props) {
  return (
    <div className="card" style={{width: '18rem'}}>
        <img className="card-img-top" src={require('../imagenes/batman_tee_27285.webp')} alt="Card cap"/>
        <div className="card-body">
            <h5 className="card-title">{props.titulo}</h5>
            <p className="card-text">Remera</p>
            <h5 className="card-title">$1.100</h5>
        </div>
    </div>
  )
}

export default ProductCard