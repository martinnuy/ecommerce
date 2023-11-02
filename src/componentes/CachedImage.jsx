import React from 'react';
import { useQuery } from 'react-query';
import '../hojas-de-estilos/CachedImage.css'

function CachedImage({ src, alt, className, blurImage }) {
  const { data: image, isLoading, isError } = useQuery(['image', src], async () => {
    const img = new Image();
    img.src = src;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'));
      };
    });
  });

  //Esta variable 'rand' se utiliza para asignar una key random a la imagen, de manera que se vuelva a cargar el componente img al acceder y asi poder mostrar la img-blur
  const rand = Math.random();

  if (isLoading) {
    // Muestra un spinner o un mensaje de carga mientras se carga la imagen.
    return <img className="card-img-top img-slider" src={require('../imagenes/disable.png')} alt={alt} />; // Muestra un componente nulo mientras se carga la imagen
  }

  if (isError) {
    // Muestra un mensaje de error si la carga de la imagen falla.
    return <div>Error al cargar la imagen</div>;
  }

  if (image) {
    return <img className={`${className}${ blurImage ? ' img-blur blur-effect' : ''}`} src={image.src} alt={alt} key={`${ blurImage ? rand : ''}`} />;
  }

}

export default CachedImage;
