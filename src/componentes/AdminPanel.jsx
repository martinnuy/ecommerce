import React, { useState } from "react";
import NavSimple from "./NavSimple";
import PanelButton from "./PanelButton";
import "../hojas-de-estilos/AdminPanel.css";
import AgregarProducto from "./AgregarProducto";
import MostrarProductos from "./MostrarProductos";
import Subtitulo from "./Subtitulo";
import AgregarCategoria from "./AgregarCategoria";
import UsersTabla from "./UsersTabla";
import ComprasHistorial from "./ComprasHistorial";

function AdminPanel() {
  const [ventana, setVentana] = useState(<AgregarProducto />);

  const logoutFunction = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <NavSimple />

      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-dark sidebar fixed-top vh-100 z-index-nav">
            <div className="position-sticky div-link-panel">
              <ul className="nav flex-column">
                <PanelButton tittle="Inicio" />


                <PanelButton 
                  tittle="Pedidos" 
                  onclick={() => {
                    setVentana(
                      <ComprasHistorial isAdmin='true' />
                    );
                  }}
                />


                <PanelButton tittle="Estadisticas" />

                <PanelButton
                  tittle="Productos"
                  onclick={() => {
                    setVentana(
                      <div className="div-principal">
                        <Subtitulo titulo="Todos los Productos" />
                        <MostrarProductos categoria="" />
                      </div>
                    );
                  }}
                />

                <PanelButton
                  tittle="Agregar Producto"
                  onclick={() => {
                    setVentana(<AgregarProducto />);
                  }}
                />
                <PanelButton
                  tittle="Categorias"
                  onclick={() => {
                    setVentana(<AgregarCategoria />);
                  }}
                />
                <PanelButton
                  tittle="Usuarios"
                  onclick={() => {
                    setVentana(<UsersTabla />);
                  }}
                />
                <PanelButton tittle="Ofertas" />
                <PanelButton tittle="Cerrar Sesion" onclick={logoutFunction} />
              </ul>
            </div>
          </nav>
          <div className="col-md-2"></div>
          <main className="col-md-10">{ventana}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
