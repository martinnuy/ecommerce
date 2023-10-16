import './App.css';
import Nav from './componentes/Nav';
import Carousel from './componentes/Carousel';
import Banner from './componentes/Banner';
import Footer from './componentes/Footer';
import Slider from './componentes/Slider';
import Subtitulo from './componentes/Subtitulo';

import destacados from './data.js';

import ProductCard from './componentes/ProductCard';
import { SwiperSlide } from 'swiper/react';

function App() {

  const listaDestacados = destacados.map((p, index) =>{
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
  });

  return (
    <div className="App">
      

      <Nav/>
      <Carousel/>
      <Banner/>

      <Subtitulo titulo="MÁS VENDIDO"/>
      <Slider arregloPrendas ={listaDestacados} />

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      
      

      <Footer/>

    </div>
  );
}

export default App;
