import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

const ProductDetail = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('Azul');
  const [isFavorite, setIsFavorite] = useState(false);

  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Aquí debes hacer una llamada a tu API o cargar los datos del producto según el ID
    // Puedes usar axios, fetch, u otra biblioteca para manejar las solicitudes HTTP

    // Ejemplo de cómo podrías cargar datos desde una API ficticia:
    fetch( process.env.REACT_APP_API_URI + `/productos/slug/${slug}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details', error));
  }, [slug]);



  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
        <Nav/>
        <div className='div-principal'>
            
        <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <img
            src={product.img}
            alt="Product"
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="mb-4">{ product.nombre }</h2>
          <p className="lead mb-4">Descripción del producto.</p>
          <div className="mb-4">
            <span className="text-muted">Precio:</span> ${product.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </div>
          <div className="mb-4">
            <span className="text-muted">Disponibilidad:</span> En stock
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="form-label">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="size" className="form-label">Talle:</label>
            <select
              id="size"
              className="form-select"
              value={size}
              onChange={handleSizeChange}
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="form-label">Color:</label>
            <select
              id="color"
              className="form-select"
              value={color}
              onChange={handleColorChange}
            >
              <option value="Rojo">Rojo</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Negro">Negro</option>
            </select>
          </div>
          <button className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`} onClick={toggleFavorite}>
            {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          </button>
          <button className="btn btn-secondary ms-2">Agregar al carrito</button>
          <button className="btn btn-primary ms-2">Comprar</button>
        </div>
      </div>
    </div>
        </div>

        <Footer infiniteTextValue={props.infiniteTextValue}/>
    </div>
  );
};

export default ProductDetail;
