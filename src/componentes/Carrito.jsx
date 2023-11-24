import React from "react";
import "../hojas-de-estilos/Carrito.css";
import Footer from "./Footer";
import Nav from "./Nav";
import Subtitulo from "./Subtitulo";
import { useQuery, useQueryClient } from "react-query";
import LoadSpinner from "./LoadSpinner";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";


function Carrito(props) {
    const queryClient = useQueryClient();

    const { data: traerProductos, isLoading, isError } = useQuery(
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
          return data;
        },
        {
          staleTime: 1000, // Establece un período de 60 segundos antes de consultar nuevamente
        }
      );

      const eliminarProductoDelCarrito = async (productId) => {
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
            
            console.log('Eliminación exitosa');
          } else {
            console.error('Error al intentar eliminar:', response.status);
          }
        } catch (error) {
          console.error('Error en la solicitud de eliminación:', error);
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
              <div
                key={index}
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
                      <span className="text-grey px-1 resize-h5">Talle: <span className="fw-bold resize-h5">{producto.talle}</span> </span>
                    </div>
                    <div className="color col-md-12 text-center p-0">
                      <span className="text-grey px-1 resize-h5"> Color: <span className="fw-bold resize-h5">{producto.color}</span> </span>
                    </div>
                  </div>
                </div>
                <div className="align-items-center text-center qty col-3 col-md-3">
                    <h5 className="text-grey mt-1 mr-1 ml-1 px-1 resize-h5">{producto.cantidad}</h5>
                </div>
                <div className="col-2 col-md-2 text-end">
                  <h5 className="text-grey resize-h5">$ {producto.precio_unitario * producto.cantidad}</h5>
                </div>
                <div className="col-1 col-md-1 align-items-center text-end pb-2">
                  <Link className="red-hover-link" to="" onClick={() => eliminarProductoDelCarrito(producto.producto_id)}> <FaTrashCan /> </Link>
                </div>
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
              />
              <button
                className="btn btn-outline-danger btn-m ml-2"
                type="button"
              >
                Aplicar
              </button>
            </div>

            {/* Botón de pagar */}
            <div className="text-center mt-3 p-2 bg-white rounded">
              <button className="btn btn-danger boton-login-adm" type="button">
                Continuar con el Pago
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  );
}

export default Carrito;
