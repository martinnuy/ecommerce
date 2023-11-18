import React from 'react';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import LoadSpinner from './LoadSpinner';

function MostrarProductos(props) {
  
  const { data: traerProductos, isLoading, isError } = useQuery(
    ['productos', props.categoria],
    async () => {
      const token = localStorage.getItem('token');
      const response = await fetch( process.env.REACT_APP_API_URI + `/productos/${props.categoria}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
              id={p._id}
              slug={p.slug}
              blurImage='true'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostrarProductos;
