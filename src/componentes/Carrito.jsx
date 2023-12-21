import React, { useContext, useState } from "react";
import "../hojas-de-estilos/Carrito.css";
import Footer from "./Footer";
import Nav from "./Nav";
import Subtitulo from "./Subtitulo";
import { useQuery, useQueryClient } from "react-query";
import LoadSpinner from "./LoadSpinner";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

import { DataContext } from "../contexts/dataContext";
import { BsCartXFill } from "react-icons/bs";


function Carrito(props) {
    const queryClient = useQueryClient();
    const [codigoDeDescuento, setCodigoDeDescuento] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const navigate = useNavigate();


    const {contextDataCart, setContextDataCart} = useContext(DataContext);
    

    const { data: traerProductos, isLoading, isError, refetch  } = useQuery(
        ['productos', props.categoria],
        async () => {
          const token = localStorage.getItem('token');
          const response = await fetch( process.env.REACT_APP_API_URI + `/productos/${props.categoria}`,{
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          const data = await response.json();
          setCodigoDeDescuento(data.codigoDeDescuento.codigo);
          return data;
        },
        {
          staleTime: 1000, // Establece un período de 60 segundos antes de consultar nuevamente
        }
      );

      const eliminarProductoDelCarrito = async (productId, cantidadAEliminar) => {
        try {
    
          const response = await fetch( process.env.REACT_APP_API_URI + `/productos/carrito/${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token'),
            },
          });
    
          if (response.ok) {
            // Después de la eliminación exitosa, actualiza manualmente la caché
            queryClient.invalidateQueries(['productos', props.categoria]);

            if(contextDataCart - cantidadAEliminar >= 0){
              setContextDataCart(contextDataCart - cantidadAEliminar)
            }
            
            //console.log('Eliminación exitosa');
          } else {
            console.error('Error al intentar eliminar:', response.status);
          }
        } catch (error) {
          console.error('Error en la solicitud de eliminación:', error);
        }
      };



      const agregarOQuitarCarrito = async (id, slug, quantity, size, color, _id) => {
    
        // Obtener el token del Local Storage
        const token = localStorage.getItem('token');
        if(token && (parseInt(document.getElementById('quantity-'+_id).value) + quantity) > 0){
    
            // Crear un objeto FormData para enviar datos del formulario
          const formData = new FormData();
          formData.append('talle', size);
          formData.append('color', color);
    
    
          try {
            // Enviar la solicitud POST al servidor con el token en el encabezado
            const response = await fetch( process.env.REACT_APP_API_URI + '/productos/carrito/' + id + '/' + quantity, {
              method: 'POST',
              body: formData,
              headers: {
                Authorization: `Bearer ${token}` // Agregar el token al encabezado
              }
            });
    
            const plusButton = document.getElementById('plusButton-' + _id);
            
            if (response.ok) {
              refetch(); 
              setContextDataCart(contextDataCart + quantity);
              if(plusButton){plusButton.removeAttribute('disabled');}
            } else {
              const errorFromServer = await response.json();
              const errorDiv = document.getElementById('error-' + _id);
              errorDiv.innerHTML = errorFromServer.error;

              if(response.status === 400 && plusButton){
                plusButton.setAttribute('disabled', '');
              }

              setTimeout(() => {
                if(errorDiv){errorDiv.innerHTML = '';}
              }, 10000);

              throw new Error(errorFromServer.error);
            }
        } catch (error) {
            // Mostrar un mensaje de error
            console.log(error);
          }
    
        }else{
          if(!token){
            navigate('/login');
          }
        } 
        
    
      };


      const aplicarCodigoDeDescuento = async (id, slug, quantity, size, color, _id) => {
    
        // Obtener el token del Local Storage
        const token = localStorage.getItem('token');
        if(token){
    
            // Crear un objeto FormData para enviar datos del formulario
          const formData = new FormData();
          formData.append('codigo', codigoDeDescuento);
  
          try {
            // Enviar la solicitud POST al servidor con el token en el encabezado
            const response = await fetch( process.env.REACT_APP_API_URI + '/productos/codigodescuento/carrito', {
              method: 'POST',
              body: formData,
              headers: {
                Authorization: `Bearer ${token}` // Agregar el token al encabezado
              }
            });
             
            if (response.ok) {
              const serverMessage = await response.json();
              refetch(); 
              setMessage(serverMessage.message);
              setMessageColor('green');
            } else {
              const errorFromServer = await response.json();
              setMessage(errorFromServer.message);
              setMessageColor('red');

              throw new Error(errorFromServer.message);
            }
          } catch (error) {
            // Mostrar un mensaje de error
            console.log(error);
          }
    
        }else{
          if(!token){
            navigate('/login');
          }
        } 
        
    
      };


    
      //Spinner
      if (isLoading) {
        return (
          <LoadSpinner />
          )
      }
    
      //Control de Error
      if (isError) {
        return <div>Error al obtener los datos</div>;
      }


  return (
    <div className="div-contenedor-productos">
      <Nav />

      <Subtitulo titulo={props.titulo} />

      {
      (traerProductos.productosCarrito.length === 0) ? (

        <div className="container mt-5 void-section rounded">
          <div className="text-center">
          <BsCartXFill size={100} />
            <p className="mt-3 fs-5">Aún no tienes productos en tu Carrito...</p>
            <p className='fs-5 text-secondary'>¡Empieza un carrito de compras!</p>
          </div>
        </div>

      ):(
      <div className="container mt-3 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-8">
            <div className="p-2">
              <h4 className="text-center mb-4">Resumen de compra</h4>
            </div>

            <div className="row border-bottom">
                <div className="col-6 col-md-6"><h5 className="px-1 resize-h5">Producto</h5></div>

                <div className="col-3 col-md-3 text-center pe-4"><h5 className="px-1 resize-h5">Cantidad</h5></div>
                <div className="col-3 col-md-3 text-center pe-4"><h5 className="px-1 resize-h5">Precio</h5></div>
            </div>

            {/* Productos del carrito */}
            {traerProductos.productosCarrito.map((producto, index) => (
              <div key={index}>
                  <div
                  className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
                >
                  <div className="mr-1 col-3 col-md-2">
                    <Link to={'../p/' + producto.slug}>
                      <img
                          className="rounded"
                          src={producto.img}
                          width="70"
                          alt={`Product ${index + 1}`}
                      />
                    </Link>
                  </div>
                  <div className="d-flex flex-column align-items-center product-details col-3 col-md-4">
                    <Link className="red-hover-link" to={'../p/' + producto.slug}><h5 className="font-weight-bold resize-h5">{producto.nombre}</h5></Link>
                    <div className="row product-desc">
                      <div className="size mr-1 col-md-12 text-center p-0">
                        { (producto.talle !== '') ? (
                            <span className="text-grey px-1 resize-h5">Talle: <span className="fw-bold resize-h5">{producto.talle}</span> </span>
                          ):(
                            <span></span>
                          )
                        }
                      </div>
                      <div className="color col-md-12 text-center p-0">
                        { (producto.color !== '') ? (
                              <span className="text-grey px-1 resize-h5"> Color: <span className="fw-bold resize-h5">{producto.color}</span> </span>
                            ):(
                              <span></span>
                            )
                          }
                        
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center text-center qty col-3 col-md-3 justify-content-center p-2">

                    <div className="col-md-6 rounded-pill d-inline-block p-0 resize-button-div" style={{ alignItems: 'center', backgroundColor: '#e2e2e2' }}>
                      
                      
                      <div className="col-4 d-inline-block" >
                        <button
                          type="button"
                          className="btn btn-danger rounded-pill d-inline botones-cantidad botones-cantidad-hover"
                          onClick={()=>agregarOQuitarCarrito(producto.producto_id, producto.slug, -1, producto.talle, producto.color, producto._id)}
                        >
                          -
                        </button>
                      </div>
                      
                      <div className="col-4 d-inline-block" >
                        <input
                          type="number"
                          id={`quantity-${producto._id}`}
                          className="form-control text-center d-inline no-spin botones-cantidad"
                          value={producto.cantidad}
                          min="1"
                          readOnly
                          required
                        />
                      </div>
                      
                      <div className="col-4 d-inline-block" >
                        <button
                          type="button"
                          className="btn btn-danger rounded-pill d-inline botones-cantidad botones-cantidad-hover"
                          onClick={()=>agregarOQuitarCarrito(producto.producto_id, producto.slug, 1, producto.talle, producto.color, producto._id)}
                          id={`plusButton-${producto._id}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="d-inline counter-input-div">
                        
                      </div>
                      
                      
                      
                    </div>

                  </div>
                  <div className="col-2 col-md-2 text-end">
                    <h5 className="text-grey resize-h5">$ {producto.precio_unitario * producto.cantidad}</h5>
                  </div>
                  <div className="col-1 col-md-1 align-items-center text-end pb-2">
                    <Link className="red-hover-link" to="" onClick={() => eliminarProductoDelCarrito(producto._id, producto.cantidad)}> <FaTrashCan /> </Link>
                  </div>

                </div>
                  <div className='mt-2 col-md-12 text-center' style={{ color: 'red' }} id={`error-${producto._id}`} ></div>
              </div>
            ))}

            <div className="row border-top mt-4">
                <h3 className="text-grey text-center mt-3">Total $ {traerProductos.precioTotal}</h3>
            </div>

            {/* Código de descuento / Tarjeta de regalo */}
            <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
              <input
                type="text"
                className="form-control border gift-card mx-2"
                placeholder="Código de descuento"
                value={codigoDeDescuento}
                onChange={(e) => setCodigoDeDescuento(e.target.value)}
              />
              <button
                className="btn btn-outline-danger btn-m ml-2"
                type="button"
                onClick={aplicarCodigoDeDescuento}
              >
                Aplicar
              </button>

            </div>
            
            <div className='mt-2 col-md-12 text-center' style={{ color: messageColor }} >{message}</div>

            {/* Botón de pagar */}
            <div className="text-center mt-3 p-2 bg-white rounded">
              <button 
                className="btn btn-danger boton-login-adm" 
                type="button" 
                onClick={() =>{ navigate('/envio') }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>)}

      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  );
}

export default Carrito;
