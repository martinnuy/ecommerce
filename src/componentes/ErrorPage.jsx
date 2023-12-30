import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import CachedImage from "./CachedImage";

function ErrorPage() {
  //Cambia el titulo de la pagina.
  useEffect(() => {
    document.title = "404 - DripDrop";
    // Puedes limpiar el título cuando el componente se desmonta
    return () => {
      document.title = "DripDrop";
    };
  }, []);

  return (
    <div>
      <Nav />

      <div className="div-principal">
        <div className="container mt-5 void-section rounded">
          <div className="text-center">
            <div className="container">
              <h1>404</h1>
              <p>
                <strong>Not found</strong>
              </p>

              <p>
                Parece que la página que intentas acceder ha sido eliminada o no
                está disponible en este momento.
              </p>

              <p>
                Si crees que esto es un error, por favor verifica la URL o
                regresa a la <Link to="/" style={{color: '#e91e63'}}>página de inicio</Link>
              </p>

              <Link to="/">
                <CachedImage
                  className="logo invert-color mt-4"
                  src={require("../imagenes/logo.png")}
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ErrorPage;
