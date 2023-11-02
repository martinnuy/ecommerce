import React from "react";
import '../hojas-de-estilos/Carousel.css'
import InfiniteText from "./InfiniteText";
import CachedImage from "./CachedImage";

function Principal(props){
    return(
        <div className="div-principal shadow-lg">

            <InfiniteText infiniteTextValue={props.infiniteTextValue}/>

            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <CachedImage src={require('../imagenes/carousel/1.jpg')} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <CachedImage src={require('../imagenes/carousel/2.jpg')} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <CachedImage src={require('../imagenes/carousel/3.webp')} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <CachedImage src={require('../imagenes/carousel/4.webp')} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <CachedImage src={require('../imagenes/carousel/5.webp')} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <InfiniteText infiniteTextValue={props.infiniteTextValue}/>

        </div>
    );
}

export default Principal;