import React from 'react'
import Nav from './Nav';
import Carousel from './Carousel';
import Banner from './Banner';
import Footer from './Footer';
import Slider from './Slider';
import Subtitulo from './Subtitulo';

import {destacados, ultimos} from '../data.js';

import ProductCard from './ProductCard';
import { SwiperSlide } from 'swiper/react';
import ShowImg from './ShowImg';
import SubscriptionDiv from './SubscriptionDiv';
import InfiniteText from './InfiniteText';

function Home() {

    function traerPrendas(grupo){
        return(
          grupo.map((p, index) =>{
            return(
              <SwiperSlide key={index}> 
                <ProductCard
                  titulo={p.titulo}
                  tipo={p.tipo}
                  precio={p.precio}
                  imgUrl={p.imgUrl}
                />  
              </SwiperSlide>
            );
          })
        );
      }

    const listaDestacados = traerPrendas(destacados);
    const listaUltimosLanzamientos = traerPrendas(ultimos);
    const infiniteTextValue = "👻 20% OFF CON EL CODIGO: OCTUBRE 👻";

  return (
    <div>
      <Nav/>
      <Carousel text={infiniteTextValue}/>
      <Banner/>
      
      <Subtitulo titulo="MÁS VENDIDO"/>
      <Slider arregloPrendas ={listaDestacados} />

      <Subtitulo titulo="ULTIMOS LANZAMIENTOS"/>
      <Slider arregloPrendas ={listaUltimosLanzamientos} />


      <ShowImg/>


      <SubscriptionDiv/>

      <Footer text={infiniteTextValue}/>
    </div>
  )
}

export default Home