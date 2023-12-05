import './App.css';


import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ProductGallery from './componentes/ProductGallery';
import Home from './componentes/Home';
import AdminLogin from './componentes/AdminLogin';
import AdminPanel from './componentes/AdminPanel';
import {jwtDecode} from 'jwt-decode';
import AboutUsSection from './componentes/AboutUsSection';
import DevolucionesSection from './componentes/DevolucionesSection';
import TerminosSection from './componentes/TerminosSection';
import PreguntasSection from './componentes/PreguntasSection';
import ScrollToTop from './componentes/ScrollToTop';

import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetail from './componentes/ProductDetail';
import { useEffect } from 'react';
import Carrito from './componentes/Carrito';

import { DataContextProvider } from './contexts/dataContext';
import Signup from './componentes/Signup';
import ConfirmarEmail from './componentes/ConfirmarEmail';
import NuevaContraseña from './componentes/NuevaContraseña';

const queryClient = new QueryClient();


function App() {

  const verificarExpiracionToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          // El token ha expirado, desloguear al usuario.
          localStorage.removeItem("token");
          window.location.href = '/';
        }

      } catch (error) {
        console.error('Error al decodificar el token:', error);
        // Manejar el error si hay problemas al decodificar el token.
      }
    }
  };

  //Se ejecuta el entrar a la pagina
  verificarExpiracionToken();

  useEffect(() => {
    // Verificar la expiración del token cada 1 minutos (ajusta según tus necesidades).
    const intervalo = setInterval(verificarExpiracionToken, 1 * 60 * 1000);

    // Limpiar el intervalo al desmontar el componente.
    return () => clearInterval(intervalo);
  }, []);




  //Texto para el banner con movimiento  
  const infiniteTextValue = "🎅 20% OFF CON EL CODIGO: Drip 🎅";


  return (
    <div className="App">
      <DataContextProvider>
        <QueryClientProvider client={queryClient}>

  <BrowserRouter>
    <ScrollToTop />
    
    <Routes>
      <Route path='/' element={<Home infiniteTextValue={infiniteTextValue} />} />
      
      <Route path='/ropa' element={<ProductGallery titulo="ROPA" categoria="remera" infiniteTextValue={ infiniteTextValue }/>} />
      <Route path='/calzado' element={<ProductGallery titulo="CALZADO" categoria="calzado" infiniteTextValue={ infiniteTextValue }/>} />
      <Route path='/accesorios' element={<ProductGallery titulo="ACCESORIOS" categoria="accesorios" infiniteTextValue={ infiniteTextValue }/>} />
      <Route path='/surf' element={<ProductGallery titulo="SURF" categoria="surf" infiniteTextValue={ infiniteTextValue }/>} />

      <Route path='/nosotros' element={<AboutUsSection infiniteTextValue={ infiniteTextValue }/>} />
      <Route path='/terminos' element={<TerminosSection infiniteTextValue={ infiniteTextValue }/>} />
      <Route path='/preguntas' element={<PreguntasSection infiniteTextValue={ infiniteTextValue }/>} />
      <Route path='/devoluciones' element={<DevolucionesSection infiniteTextValue={ infiniteTextValue }/>} />
      
      <Route path='/p/:slug' element={<ProductDetail infiniteTextValue={ infiniteTextValue } />} />

      <Route path='/s/:busqueda' element={<ProductGallery titulo="RESULTADOS" categoria="remera" infiniteTextValue={ infiniteTextValue }/>} />


      <Route path='/user' element={ 
        localStorage.getItem('token') != null ? (
          <ProductGallery titulo="Usuario" categoria="" infiniteTextValue={ infiniteTextValue }/>
        ) : (
          <Navigate to="/login" />
        )
      } />

      <Route path='/cart' element={ 
        localStorage.getItem('token') != null ? (
          <Carrito titulo="CARRITO" categoria="carrito" infiniteTextValue={ infiniteTextValue }/>
        ) : (
          <Navigate to="/login" replace/>
        )
      } />

      <Route path='/favoritos' element={ 
        localStorage.getItem('token') != null ? (
          <ProductGallery titulo="FAVORITOS" categoria="favoritos" infiniteTextValue={ infiniteTextValue } actualizarEnEntrar='true'/>
        ) : (
          <Navigate to="/login" replace/>
        )
      } />


      <Route 
          path='/login' 
          element={
            localStorage.getItem('token') != null && jwtDecode(localStorage.getItem('token')).role === 'admin' ? (
              <Navigate to="/admin/panel" />
            ) : (
              localStorage.getItem('token') == null ? (
                <AdminLogin />
              ) : (
                <Navigate to="/" />
              )
            )
          }
        /> 

      <Route 
          path='/signup' 
          element={
            localStorage.getItem('token') != null && jwtDecode(localStorage.getItem('token')).role === 'admin' ? (
              <Navigate to="/admin/panel" />
            ) : (
              localStorage.getItem('token') == null ? (
                <Signup />
              ) : (
                <Navigate to="/" />
              )
            )
          }
        /> 

        <Route 
          path='/confirmacion/:token' 
          element={
            localStorage.getItem('token') != null && jwtDecode(localStorage.getItem('token')).role === 'admin' ? (
              <Navigate to="/admin/panel" />
            ) : (
              localStorage.getItem('token') == null ? (
                <ConfirmarEmail />
              ) : (
                <Navigate to="/" />
              )
            )
          }
        />

        <Route 
          path='/newpassword/:token' 
          element={
            localStorage.getItem('token') != null && jwtDecode(localStorage.getItem('token')).role === 'admin' ? (
              <Navigate to="/admin/panel" />
            ) : (
              localStorage.getItem('token') == null ? (
                <NuevaContraseña />
              ) : (
                <Navigate to="/" />
              )
            )
          }
        />

      <Route 
          path='/admin' 
          element={
            localStorage.getItem('token') != null && jwtDecode(localStorage.getItem('token')).role === 'admin' ? (
              <Navigate to="/admin/panel" />
            ) : (
              localStorage.getItem('token') == null ? (
                <AdminLogin />
              ) : (
                <Navigate to="/" />
              )
            )
          }
        />

      <Route 
        path='/admin/panel' 
        element={
          localStorage.getItem('token') != null && jwtDecode(localStorage.getItem('token')).role === 'admin' ? (
            <AdminPanel/>
          ) : ( 
            <Navigate to="/" /> 
          )
        }
      />

    </Routes>

  </BrowserRouter>
  </QueryClientProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
