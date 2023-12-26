import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import LoadSpinner from './LoadSpinner';
import { GiBrokenHeart } from "react-icons/gi";
import { MdOutlineShoppingBag } from "react-icons/md";
import '../hojas-de-estilos/MostrarProductos.css';

function MostrarProductos(props) {
  
  const { data: traerProductos, refetch, isLoading, isError } = useQuery(
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

  useEffect(() => {
    // Verifica la condición deseada, por ejemplo, si una propiedad específica cambia
    if (props.actualizarEnEntrar) {
      // Vuelve a consultar los datos utilizando la función refetch
      refetch();
    }
  }, [props.actualizarEnEntrar, refetch]);


  
  //Cambia el titulo de la pagina.
  useEffect(() => {
    if(props.titulo){
      document.title = ( props.titulo.charAt(0).toUpperCase() + props.titulo.slice(1).toLowerCase() ) + ' - DripDrop';
      // Puedes limpiar el título cuando el componente se desmonta
      return () => {
        document.title = 'DripDrop';
    };
    }
  }, [props.titulo]);

  //Spinner
  if (isLoading) {
    return (
      <LoadSpinner />
      )
  }

  //Control de Error
  if (isError) {
    return <div>Error al obtener los datos</div>;
  }

  //En caso de que no existan prodctos favoritos
  if(props.categoria === 'favoritos' && traerProductos.length === 0){
    return (
        <div className="container mt-5 void-section rounded">
          <div className="text-center">
            <GiBrokenHeart size={100} />
            <p className="mt-3 fs-5">Aún no tienes productos en Favoritos...</p>
            <p className='fs-5 text-secondary'>Agrega aquí los productos que te gustaron para poder verlos más tarde.</p>
          </div>
        </div>
    )
  }

  //En caso de que no existan productos en el carrito
  if(props.categoria === 'carrito' && traerProductos.length === 0){
    return (
      <div className="container mt-5 void-section rounded">
      <div className="text-center">
         <MdOutlineShoppingBag size={100} />
        <p className="mt-3 fs-5">¡Empieza un carrito de compras!</p>
        <p className='fs-5 text-secondary'>¡Inicia tu selección de productos y disfruta de la experiencia de compra!</p>
      </div>
    </div>
    )
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
