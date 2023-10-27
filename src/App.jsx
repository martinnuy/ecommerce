import './App.css';


import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Example from './componentes/Example';
import Home from './componentes/Home';
import AdminLogin from './componentes/AdminLogin';


function App() {




  return (
    <div className="App">
      
      <BrowserRouter>


        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ropa' element={<Example/>}/>

          <Route path='/admin' element={<AdminLogin/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
