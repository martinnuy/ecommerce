import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LoadSpinner from "./LoadSpinner";
import "../hojas-de-estilos/ProductDetail.css";

import { DataContext } from "../contexts/dataContext";


const ProductDetail = (props) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [actualizarNav, setActualizarNav] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); 
  const [stock, setStock] = useState('');


  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const {contextDataCart, setContextDataCart} = useContext(DataContext);
  const {contextDataFavoritos, setContextDataFavoritos} = useContext(DataContext);

  useEffect(() => {
    // Cargar datos desde la API
    fetch(process.env.REACT_APP_API_URI + `/productos/slug/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        if(data.tallesDisponibles.length === 1){ 
          setStock(data.tallesDisponibles[0].stock); 
        }
      })
      .catch((error) => console.error("Error fetching product details", error));
  }, [slug]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const sumarORestar = (number) => {
    if((quantity + number) > 0 && (quantity + number) <= stock){
      setQuantity(quantity + number);
    }
    if(!size && product.tallesDisponibles.length !== 1){
      setMessage('Seleccione un talle.')
      setMessageColor('red');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }

  const handleSizeChange = (talle) => {
    const botonesTalles = document.getElementById('div-talles').children;
    //Activa el boton seleccionado y desactiva los demas
    for(const boton of botonesTalles){
      if(boton.innerHTML !== talle){
        boton.classList.remove('active');
      }else{
        boton.classList.add('active');
        setStock(boton.getAttribute('data-stock'));
        setQuantity(1);
      }
    }
    //Cambia el valor del talle para ser enviado a la bd
    setSize(talle);
  };

  const handleColorChange = (color) => {
    const botonesColores = document.getElementById('div-colores').children;
    //Activa el boton seleccionado y desactiva los demas
    for(const boton of botonesColores){
      if(boton.value !== color){
        boton.classList.remove('custom-color-button-active');
      }else{
        boton.classList.add('custom-color-button-active');
      }
    }
    //Cambia el valor del color para ser enviado a la bd
    setColor(color);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Obtener el token del Local Storage
    const token = localStorage.getItem('token');
    if(token){

        // Crear un objeto FormData para enviar datos del formulario
      const formData = new FormData();
      formData.append('talle', size);
      formData.append('color', color);


      try {
        // Enviar la solicitud POST al servidor con el token en el encabezado
        const response = await fetch( process.env.REACT_APP_API_URI + '/productos/carrito/' + product._id + '/' + quantity, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}` // Agregar el token al encabezado
          }
        });

        if (response.ok) {
          setContextDataCart(contextDataCart + quantity);
          navigate('/cart');
        } else {
          const errorFromServer = await response.json();
          setMessage(errorFromServer.error);
          setMessageColor('red');
          setTimeout(() => {
            setMessage('');
          }, 5000);
          throw new Error(errorFromServer.error);
        }
    } catch (error) {
        // Mostrar un mensaje de error
        console.log(error);
      }

    }else{
      navigate('/login');
    } 
    

  };

  const favoriteAddOrRemove = async (metodo) =>{
    
    if(localStorage.getItem('token') !== null){
      await fetch(process.env.REACT_APP_API_URI + `/productos/favoritos/${product._id.toString()}`, {
        method: metodo,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json', // Puedes ajustar los encabezados según tus necesidades
        }
      })

     if(metodo === 'POST'){
      setContextDataFavoritos(contextDataFavoritos + 1);
     }
     if(metodo === 'DELETE'){
      setContextDataFavoritos(contextDataFavoritos - 1);
     } 

      setActualizarNav(!actualizarNav);
    }else{
      navigate('/login');
    }   
  }

  //Se ejecuta al cargar todo el componente
  useEffect(() => {
    //Si solo existe un color disponible lo selecciona automaticamente.
    if (product && product.coloresDisponibles.length === 1) {
      handleColorChange(product.coloresDisponibles[0].nombreDelColor);
    }
    
    //Si solo existe un talle disponible lo selecciona automaticamente.
    if (product && product.tallesDisponibles.length === 1) {
      handleSizeChange(product.tallesDisponibles[0].talle)
    }

    if(product && localStorage.getItem('token')){
      fetch(process.env.REACT_APP_API_URI + `/productos/favoritos/${product._id.toString()}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json', // Puedes ajustar los encabezados según tus necesidades
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setIsFavorite(data);
        })
        .catch(error => {
          console.error('Error durante la solicitud:', error);
          // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje al usuario
        });
    }

  }, [product]);


  if (!product) {
    return <LoadSpinner center="true" />;
  }

  return (
    <div>
      <Nav />

      <div className="div-principal">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <img src={product.img} alt="Product" className="img-fluid" />
            </div>

            <form className="col-lg-6" onSubmit={handleFormSubmit}>
              <h2 className="mb-4">
                {product.nombre}

                <span className="red-hover-link px-3" onClick={toggleFavorite}>
                  {isFavorite ? <AiFillHeart onClick={()=> favoriteAddOrRemove('DELETE')} /> : <AiOutlineHeart onClick={()=> favoriteAddOrRemove('POST')} />}
                </span>

              </h2>
              <p className="lead mb-4">
              {product.descripcion}
              </p>
              <div className="mb-4">
                <h4>
                  $
                  {product.precio
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </h4>
              </div>

              <div className="mb-4">
                <label htmlFor="quantity" className="form-label d-block mb-4">
                  Cantidad:
                </label>

                <div className="rounded-pill d-inline-block" style={{ alignItems: 'center', backgroundColor: '#e2e2e2' }}>
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill d-inline counter-button"
                    onClick={()=>sumarORestar(-1)}
                  >
                    -
                  </button>
                  <div className="d-inline counter-input-div">
                    <input
                      type="number"
                      id="quantity"
                      className="form-control counter-input d-inline no-spin"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      readOnly
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill d-inline counter-button"
                    onClick={()=>sumarORestar(1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mb-4">
                
              <div className='my-2' style={{ color: messageColor }}>{message}</div>

                    {
                      (product.tallesDisponibles.filter(producto => producto.talle !== "").length !== 0) ? (
                        <p className='form-label'>
                          Talle: <input 
                                    className="d-inline form-control input-disable-style p-0" 
                                    type="text" 
                                    value={size} 
                                    onChange={handleSizeChange}
                                    style={{width: '100px'}}
                                    required 
                                  />
                        </p>
                      ):(
                        null
                      )
                    }
                
                


                <div id="div-talles">
                {//Se listan los talles disponibles del producto
                  (product.tallesDisponibles.filter(producto => producto.talle !== "").length !== 0) ? (

                    product.tallesDisponibles.map((talle, index) =>{
                      return(
                          <button
                            type="button"
                            className="btn p-0 btn-outline-dark m-2 custom-color-button"
                            key={index}
                            onClick={() => handleSizeChange(talle.talle)}
                            data-stock={talle.stock}
                          >
                            {talle.talle}
                          </button>
                          
                      )
                    })
                  ) : (
                    null
                  )
                }
                </div>

                <div className="mb-3 mt-3">
                  <span className="">Stock:</span> {stock}
                </div>

              </div>
              <div className="mb-4">
                
                {
                  (product.coloresDisponibles.length !== 0) ? (
                    <p className='form-label'>
                      Color: <input 
                                className="d-inline form-control input-disable-style p-0" 
                                type="text" 
                                value={color}
                                onChange={handleColorChange}
                                style={{width: '100px'}}
                                required 
                              />
                    </p>
                  ):(
                    null
                  )
                }

                
                <div id="div-colores">
                  {//Se listan los colores disponibles del producto
                    product.coloresDisponibles.map((producto, index) =>{
                      return (
                        <button
                          type="button"
                          className="btn custom-color-button m-2"
                          style={{ backgroundColor: producto.valorDelColor }}
                          value={producto.nombreDelColor}
                          key={index}
                          onClick={() => handleColorChange(producto.nombreDelColor)}
                        ></button>)
                    })
                  }
                </div>
                
              </div>
              <div></div>
              <button type="submit" className="col-12 col-md-12 mt-2 btn btn-danger boton-login-adm">
                Comprar ahora
              </button>
              <button type="submit" className="col-12 col-md-12 mt-2 btn btn-secondary">
                Agregar al carrito
              </button>
            </form>

          </div>
        </div>
      </div>

      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  );
};

export default ProductDetail;
