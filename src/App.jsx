import './App.css';
import Nav from './componentes/Nav';
import Carousel from './componentes/Carousel';
import Banner from './componentes/Banner';
import Footer from './componentes/Footer';
import Slider from './componentes/Slider';
import Subtitulo from './componentes/Subtitulo';

import {destacados, ultimos} from './data.js';

import ProductCard from './componentes/ProductCard';
import { SwiperSlide } from 'swiper/react';
import ShowImg from './componentes/ShowImg';
import SubscriptionDiv from './componentes/SubscriptionDiv';
import InfiniteText from './componentes/InfiniteText';


function App() {

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
    <div className="App">
      

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
  );
}

export default App;
