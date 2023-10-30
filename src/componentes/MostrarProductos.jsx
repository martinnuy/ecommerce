import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

function MostrarProductos(props) {

  const [traerProductos, setTraerProductos] = useState([]);

  useEffect(() => {

    // Realiza una solicitud Fetch para obtener los productos mas vendidos
    fetch(`http://localhost:4000/api/v1/productos/${props.categoria}`)
      .then((response) => response.json())
      .then((data) => {
        setTraerProductos(data); // Guarda los datos en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error);
      });

  }, [props.categoria]);

  function generarProductos(grupo){
    if(grupo.length !== 0){
      return(
        grupo.map((p, index) =>{
          return(
            <div className='col-md-3 text-center' key={index}>
              <ProductCard
                titulo={p.nombre}
                tipo={p.categoria}
                precio={p.precio}
                imgUrl={p.img}
              />  
            </div> 
          );
        
        })
      );
    }
  }


  return (
    <div>    

        <div className='row'>
          
            {generarProductos(traerProductos)}
            
        </div>
    </div>
  )
}

export default MostrarProductos