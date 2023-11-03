import React from 'react';
import { useQuery } from 'react-query';
import Nav from './Nav';
import Carousel from './Carousel';
import Banner from './Banner';
import Footer from './Footer';
import Slider from './Slider';
import Subtitulo from './Subtitulo';
import ProductCard from './ProductCard';
import { SwiperSlide } from 'swiper/react';
import ShowImg from './ShowImg';
import SubscriptionDiv from './SubscriptionDiv';
import LoadSpinner from './LoadSpinner';

function Home(props) {
  // Define una función para obtener los productos
  const fetchProductos = async (categoria) => {
    const response = await fetch( process.env.REACT_APP_API_URI + `/productos/${categoria}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  };

  // Utiliza React Query para obtener los productos más vendidos
  const { data: masVendidos, isLoading: isLoadingMasVendidos } = useQuery(
    ['masVendidos'],
    () => fetchProductos('masvendidos'),
    {
      staleTime: 60000, // Establece el período de caché en 60 segundos
    }
  );

  // Utiliza React Query para obtener los productos más recientes
  const { data: masRecientes, isLoading: isLoadingMasRecientes } = useQuery(
    ['masRecientes'],
    () => fetchProductos('masrecientes'),
    {
      staleTime: 60000, // Establece el período de caché en 60 segundos
    }
  );

  function generarProductosSlider(grupo) {
    if (grupo.length !== 0) {
      return grupo.map((p, index) => (
        <SwiperSlide key={index}>
          <ProductCard titulo={p.nombre} tipo={p.categoria} precio={p.precio} imgUrl={p.img} blurImage="true" />
        </SwiperSlide>
      ));
    }
  }

  if (isLoadingMasVendidos || isLoadingMasRecientes) {
    return (
      <LoadSpinner center="true"/>
    )
  }

  return (
    <div>
      <Nav />
      <Carousel infiniteTextValue={props.infiniteTextValue} />
      <Banner />

      <Subtitulo titulo="MÁS VENDIDO" />

      <Slider arregloPrendas={generarProductosSlider(masVendidos)} />

      <Subtitulo titulo="ULTIMOS LANZAMIENTOS" />

      <Slider arregloPrendas={generarProductosSlider(masRecientes)} />

      <ShowImg />

      <SubscriptionDiv />

      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  );
}

export default Home;
