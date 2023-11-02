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

const queryClient = new QueryClient();


function App() {

  //Texto para el banner con movimiento  
  const infiniteTextValue = "👻 20% OFF CON EL CODIGO: Drip 👻";


  return (
    <div className="App">
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
    </div>
  );
}

export default App;
