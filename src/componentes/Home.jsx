import React, { useState, useEffect } from 'react'
import Nav from './Nav';
import Carousel from './Carousel';
import Banner from './Banner';
import Footer from './Footer';
import Slider from './Slider';
import Subtitulo from './Subtitulo';

//import {destacados, ultimos} from '../data.js';

import ProductCard from './ProductCard';
import { SwiperSlide } from 'swiper/react';
import ShowImg from './ShowImg';
import SubscriptionDiv from './SubscriptionDiv';

function Home() {

  const [masVendidos, setMasVendidos] = useState([]);
  const [masRecientes, setMasRecientes] = useState([]);


  useEffect(() => {

    // Realiza una solicitud Fetch para obtener los productos mas vendidos
    fetch('http://localhost:4000/api/v1/productos/masvendidos')
      .then((response) => response.json())
      .then((data) => {
        setMasVendidos(data); // Guarda los datos en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error);
      });

    // Realiza una solicitud Fetch para obtener los productos mas recientes
      fetch('http://localhost:4000/api/v1/productos/masrecientes')
      .then((response) => response.json())
      .then((data) => {
        setMasRecientes(data); // Guarda los datos en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error);
      });

  }, []);

    //Esta funcion se encarga de generar los ProductCard que iran dentro de los slider, a partir de un arreglo.
    function generarProductosSlider(grupo){
        if(grupo.length !== 0){
          return(
            grupo.map((p, index) =>{
              return(
                <SwiperSlide key={index}> 
                  <ProductCard
                    titulo={p.nombre}
                    tipo={p.categoria}
                    precio={p.precio}
                    imgUrl={p.img}
                  />  
                </SwiperSlide>
              );
            
            })
          );
        }
      }

    //Texto para el banner con movimiento  
    const infiniteTextValue = "👻 20% OFF CON EL CODIGO: OCTUBRE 👻";

  return (
    <div>
      <Nav/>
      <Carousel text={infiniteTextValue}/>
      <Banner/>
      
      <Subtitulo titulo="MÁS VENDIDO"/>

      
      <Slider arregloPrendas ={generarProductosSlider(masVendidos)} />
      


      <Subtitulo titulo="ULTIMOS LANZAMIENTOS"/>

      <Slider arregloPrendas ={generarProductosSlider(masRecientes)} />


      <ShowImg/>


      <SubscriptionDiv/>

      <Footer text={infiniteTextValue}/>
    </div>
  )
}

export default Home