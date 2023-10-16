import React from 'react';
// Import Swiper React components
import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../hojas-de-estilos/Slider.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Slider(props) {
  return (
    <div className='px-5'>
      <Swiper 
        slidesPerView={4}
        spaceBetween={20}
        navigation={true} 
        modules={[Navigation]} 
        breakpoints={{
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        className="mySwiper">

        
          {props.arregloPrendas}
        
      </Swiper>
    </div>
  );
}