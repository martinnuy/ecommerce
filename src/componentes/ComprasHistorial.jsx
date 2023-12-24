import React from 'react'
import { useQuery } from 'react-query';
import Footer from './Footer';
import Nav from './Nav';
import Subtitulo from './Subtitulo';
import { FaHistory } from "react-icons/fa";
import LoadSpinner from './LoadSpinner';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


function ComprasHistorial( props ) {

const { data: traerHistorialDeCompras, refetch, isLoading, isError } = useQuery(
    ['productos', props.categoria],
    async () => {
        const token = localStorage.getItem('token');
        const response = await fetch( process.env.REACT_APP_API_URI + `/users/historialcompras/` + props.isAdmin,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!response.ok) {
        throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        console.log(data);
        return data;
    },
    {
        staleTime: 60000, // Establece un período de 60 segundos antes de consultar nuevamente
    }
    );

    //Cambia el titulo de la pagina.
    useEffect(() => {
      document.title = 'Mis Compras - DripDrop';
      // Puedes limpiar el título cuando el componente se desmonta
      return () => {
        document.title = 'DripDrop';
      };
    }, [])
    

    useEffect(() => {
      refetch();
    }, [props.isAdmin, refetch])
    

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
    <div>
    { props.isAdmin ? (null) : <Nav /> }

    <div className='div-contenedor-productos px-5'>
      
      <Subtitulo titulo={props.titulo}/>


      {
        traerHistorialDeCompras.length > 0 ? (
            //estado direccionDeEnvio productos codigoDeDescuento precio_total
            
            traerHistorialDeCompras.map((compra, index1) => (
              <div className='col-md-10 mb-5 mx-auto p-2 rounded shadow-lg' key={index1} style={ (compra.estado === 'approved') ? {backgroundColor: '#ffffff00'} : {backgroundColor: '#e91e6317'}}>

                <div className="row border-bottom">
                    <div className="col-6 col-md-6">
                      <h5 className="px-1 resize-h5">
                      {
                        (new Date(compra.date_approved).getFullYear() !== new Date().getFullYear()) ? (
                          new Date(compra.date_approved).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                        ):(
                          new Date(compra.date_approved).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                        )
                      }
                      </h5>

                    </div>
                    
                    {
                        props.isAdmin ? (
                          <div className="col-12 col-md-6">
                            <h5 className="px-1 resize-h5">
                             Email: {compra.user_email}
                            </h5>
                          </div>
                        ) : (
                          null
                        )
                      }

                </div>



              {compra.productos.map((producto, index) => (
              <div key={index}>
                  <div
                  className="row justify-content-between align-items-center text-center p-2 mt-4 px-3 rounded"
                >
                  <div className="mr-1 col-12 col-md-2 my-2">
                    <Link to={'../p/' + producto.slug}>
                      <img
                          className="rounded"
                          src={producto.img}
                          width="150"
                          alt={`Product ${index + 1}`}
                      />
                    </Link>
                  </div>

                  <div className="d-flex flex-column product-details col-12 col-md-2 my-2">
                    <h5 className="font-weight-bold resize-h5" style={{color: '#00a650'}}>{ compra.estado === 'approved' ? 'Pago aprobado' : 'Error con la compra'}</h5>
                    <Link className="red-hover-link" to={'../p/' + producto.slug}><h5 className="font-weight-bold resize-h5">{producto.nombre}</h5></Link>
                    <div className="row product-desc">
                      <div className="size mr-1 col-md-12">
                        { (producto.talle !== '') ? (
                            <span className="text-grey px-1 resize-h5">Talle: <span className="fw-bold resize-h5">{producto.talle}</span> </span>
                          ):(
                            <span></span>
                          )
                        }
                      </div>
                      <div className="color col-md-12">
                        { (producto.color !== '') ? (
                              <span className="text-grey px-1 resize-h5"> Color: <span className="fw-bold resize-h5">{producto.color}</span> </span>
                            ):(
                              <span></span>
                            )
                          }
                        
                      </div>
                    </div>
                  </div>
                  <div className="align-items-center qty col-12 col-md-3 justify-content-center p-2">

                    <div className="col-md-6 d-inline-block p-0 resize-button-div" style={{ alignItems: 'center' }}>
                             {
                           compra.codigoDeDescuento.codigo !== '' ? (
                            <div>
                                <p className="text-grey resize-h5 mb-1">
                                Codigo: 
                                <span className="fw-bold resize-h5"> {compra.codigoDeDescuento.codigo}</span>
                              </p>

                              <p className="text-grey resize-h5 mb-1">
                                Descuento:
                                <span className="fw-bold resize-h5"> %{compra.codigoDeDescuento.porcentaje}</span> 
                              </p>
                            </div>
                          ):(
                            null
                            )
                          } 
                                      
                          <p>{ producto.cantidad === 1 ? producto.cantidad + ' unidad' : producto.cantidad + ' unidades' }</p>
                    </div>

                  </div>
                  <div className="col-12 col-md-2">
                    <h5 className="text-grey resize-h5">$ { producto.precio_unitario * producto.cantidad - ( (producto.precio_unitario * producto.cantidad) * compra.codigoDeDescuento.porcentaje / 100 ) }</h5>
                  </div>

                </div>
                  <div className='mt-2 col-md-12 text-center' style={{ color: 'red' }} id={`error-${producto._id}`} ></div>

                

              </div>
            
            ))}

            {
              compra.direccionDeEnvio.envioADomicilio  ? (
                <div className='row my-4 px-4 pt-4 border-top'>
                  <h5>Datos de envío:</h5>
                  <h6 className='col-md-4'>Departamento: {compra.direccionDeEnvio.departamento} </h6>
                  <h6 className='col-md-4'>Barrio: {compra.direccionDeEnvio.barrio} </h6>
                  <h6 className='col-md-4'>Dirección: {compra.direccionDeEnvio.direccion} </h6>
                  <h6 className='col-md-4'>Teléfono: {compra.direccionDeEnvio.telefono} </h6>
                  <h6 className='col-md-4'>Destinatario: {compra.direccionDeEnvio.nombreDelDestinatario} </h6>
                  <h6 className='col-md-4'>Comentarios: {compra.direccionDeEnvio.comentariosAdicionales} </h6>
                </div>
              ) : (
                <div className='my-4 px-4 pt-4 border-top'>
                  <h5>Datos de envío:</h5>
                  <h6>Retirar compra en el local.</h6>
                  <h6 className='col-md-4'>Teléfono: {compra.direccionDeEnvio.telefono} </h6>
                </div>
              )
            }

              <h3 className="text-grey text-center mt-2 mb-4 pb-3 border-bottom">Total $ {compra.precio_total - ( (compra.precio_total * compra.codigoDeDescuento.porcentaje) / 100 )}</h3>
              </div>
            )).reverse()
            
            
            

        ):(
            <div className="container mt-5 void-section rounded">
            <div className="text-center">
                <FaHistory size={100} />
                <p className="mt-3 fs-5">Aún no has comprado ningun producto...</p>
                <p className='fs-5 text-secondary'>¡Empieza un carrito de compras!</p>
            </div>
            </div>
        )
      }


    </div>



    { props.isAdmin ? (null) : <Footer infiniteTextValue={props.infiniteTextValue}/> }
    

</div>
  )
}

export default ComprasHistorial