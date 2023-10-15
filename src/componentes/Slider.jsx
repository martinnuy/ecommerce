import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../hojas-de-estilos/Slider.css';

// import required modules
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';

export default function App() {
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

        <SwiperSlide> <ProductCard titulo='1'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='2'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='3'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='4'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='5'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='6'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='7'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='8'/> </SwiperSlide>
        <SwiperSlide> <ProductCard titulo='9'/> </SwiperSlide>
      </Swiper>
    </div>
  );
}