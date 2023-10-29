import './App.css';


import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Example from './componentes/Example';
import Home from './componentes/Home';
import AdminLogin from './componentes/AdminLogin';
import AdminPanel from './componentes/AdminPanel';
import {jwtDecode} from 'jwt-decode';



function App() {




  return (
    <div className="App">
      
      <BrowserRouter>


        <Routes>
          <Route path='/' element={<Home />} />
          
          <Route path='/calzado' element={<Example />} />
          <Route path='/accesorios' element={<Example />} />
          <Route path='/surf' element={<Example />} />






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
