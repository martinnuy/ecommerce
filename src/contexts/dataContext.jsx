import {React, createContext, useEffect, useState} from 'react'

export const DataContext = createContext();

export function DataContextProvider(props) {

    const [contextDataCart, setContextDataCart] = useState(0);
    const [contextDataFavoritos, setContextDataFavoritos] = useState(0);


    const valor = {contextDataCart, setContextDataCart, contextDataFavoritos, setContextDataFavoritos};

    const obtenerElementosCarrito = async () => {
        const token = localStorage.getItem('token');
        try {
          const respuesta = await fetch( process.env.REACT_APP_API_URI + '/productos/carrito/numero' , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (respuesta.ok) {
            const datos = await respuesta.json();
            setContextDataCart(datos.numeroDeElementos); // Actualiza el estado con los elementos obtenidos
          } else {
            console.error('Error al obtener elementos:', respuesta.statusText);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };

      const obtenerElementosFavoritos = async () => {
        const token = localStorage.getItem('token');
        try {
          const respuesta = await fetch( process.env.REACT_APP_API_URI + '/productos/favoritos/numero' , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (respuesta.ok) {
            const datos = await respuesta.json();
            setContextDataFavoritos(datos.numeroDeElementos); // Actualiza el estado con los elementos obtenidos
          } else {
            console.error('Error al obtener elementos:', respuesta.statusText);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
    
      useEffect(() => {
        if(localStorage.getItem('token')){
            obtenerElementosCarrito();
        }
      }, [contextDataCart]);

      useEffect(() => {
        if(localStorage.getItem('token')){
            obtenerElementosFavoritos();
        }
      }, [contextDataFavoritos]);

  return (
    <DataContext.Provider value={valor}>
        {props.children}
    </DataContext.Provider>
  )
}
