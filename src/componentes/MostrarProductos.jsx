import React from 'react'
import Nav from './Nav'
import ProductCard from './ProductCard'

function MostrarProductos() {
  return (
    <div>    
        <Nav/>

        <div className='div-principal'>

            <h1>Mostrar productos</h1>
            <ProductCard
                  titulo='prenda'
                  tipo='remera'
                  precio="1200"
                  imgUrl='https://firebasestorage.googleapis.com/v0/b/eshop-imagenes.appspot.com/o/17acd1ee-d94c-4875-8bf6-e19185bff2b6.jpg?alt=media&token=3c483dbe-63b3-4947-98e4-454e28f2b242'
            />  
            
        </div>
    </div>
  )
}

export default MostrarProductos