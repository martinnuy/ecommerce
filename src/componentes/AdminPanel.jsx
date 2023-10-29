import React from 'react'
import NavSimple from './NavSimple'
import PanelButton from './PanelButton'
import '../hojas-de-estilos/AdminPanel.css';
import AgregarProducto from './AgregarProducto';

function AdminPanel() {


  const logoutFunction = ()=>{
      localStorage.removeItem('token');
      window.location.reload();
  }

  return (
    <div>
        <NavSimple />

      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-dark sidebar vh-100">
            <div className="position-sticky div-link-panel">
              <ul className="nav flex-column">
                <PanelButton tittle="Inicio"/>
                <PanelButton tittle="Pedidos"/>
                <PanelButton tittle="Estadisticas"/>
                <PanelButton tittle="Productos"/>
                <PanelButton tittle="Agregar Producto"/>
                <PanelButton tittle="Agregar Categoria"/>
                <PanelButton tittle="Usuarios"/>
                <PanelButton tittle="Ofertas"/>
                <PanelButton tittle="Cerrar Sesion" function={logoutFunction}/>
              </ul>
            </div>
          </nav>
          <main className="col-md-10">
            
            <AgregarProducto/>

          </main>
        </div>
    </div>

    </div>
  )
}

export default AdminPanel