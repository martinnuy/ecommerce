import './App.css';


import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ProductGallery from './componentes/ProductGallery';
import Home from './componentes/Home';
import AdminLogin from './componentes/AdminLogin';
import AdminPanel from './componentes/AdminPanel';
import {jwtDecode} from 'jwt-decode';
import Modal from './componentes/Modal';



function App() {




  return (
    <div className="App">
      
      <BrowserRouter>

        <Modal/>

        <Routes>
          <Route path='/' element={<Home />} />
          
          <Route path='/ropa' element={<ProductGallery titulo="ROPA" categoria="remera" />} />
          <Route path='/calzado' element={<ProductGallery titulo="CALZADO" categoria="calzado"/>} />
          <Route path='/accesorios' element={<ProductGallery titulo="ACCESORIOS" categoria="accesorios"/>} />
          <Route path='/surf' element={<ProductGallery titulo="SURF" categoria="surf"/>} />






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
    </div>
  );
}

export default App;
