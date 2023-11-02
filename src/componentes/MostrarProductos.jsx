import React from 'react';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import LoadSpinner from './LoadSpinner';

function MostrarProductos(props) {
  
  const { data: traerProductos, isLoading, isError } = useQuery(
    ['productos', props.categoria],
    async () => {
      const response = await fetch(`http://localhost:4000/api/v1/productos/${props.categoria}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      return data;
    },
    {
      staleTime: 60000, // Establece un período de 60 segundos antes de consultar nuevamente
    }
  );

  if (isLoading) {
    return (
      <LoadSpinner />
      )
  }

  if (isError) {
    return <div>Error al obtener los datos</div>;
  }

  return (
    <div>
      <div className='row'>
        {traerProductos.map((p, index) => (
          <div className='col-md-3 text-center' key={index}>
            <ProductCard
              titulo={p.nombre}
              tipo={p.categoria}
              precio={p.precio}
              imgUrl={p.img}
              blurImage='true'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostrarProductos;
