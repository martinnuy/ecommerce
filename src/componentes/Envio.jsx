import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Subtitulo from "./Subtitulo";
import { MdLocalShipping } from "react-icons/md";
import { FaStore } from "react-icons/fa6";
import "../hojas-de-estilos/Envio.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";

function Envio(props) {
  const [envioADomicilio, setEnvioADomicilio] = useState(true);
  const [departamento, setDepartamento] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombreDelDestinatario, setNombreDelDestinatario] = useState("");
  const [comentariosAdicionales, setComentariosAdicionales] = useState("");

  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  //Coordenadas del mapa.
  const position = [-34.9062531, -56.1955472];


  const datosDeEnvio = async (e) => {
    e.preventDefault();

    if (true) {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URI + "/users/datosenvio",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ envioADomicilio, departamento, barrio, direccion, telefono, nombreDelDestinatario, comentariosAdicionales }),
          }
        );

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
          navigate('/pagar');
        } else {
          const errorData = await response.json();
          setMessage(errorData.message);
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };


  return (
    <div>
      <Nav />

      <div className="div-contenedor-productos">
        <Subtitulo titulo={props.titulo} />

        <div className="container mt-5 div-envios rounded d-block shadow-lg">
          <div className="px-5 py-4">
            <div className="row mb-3">
              <div
                className={`col-md-2 mt-3 py-1 text-center boton-envio mx-2 rounded${
                  envioADomicilio ? " boton-envio-active" : ""
                }`}
                onClick={() => setEnvioADomicilio(true)}
              >
                {" "}
                <MdLocalShipping size={20} /> Envio a domicilio.
              </div>
              <div
                className={`col-md-2 mt-3 py-1 text-center boton-envio mx-2 rounded${
                  !envioADomicilio ? " boton-envio-active" : ""
                }`}
                onClick={() => setEnvioADomicilio(false)}
              >
                {" "}
                <FaStore size={20} /> Retirar en el local.
              </div>
            </div>
            {envioADomicilio ? (
              <form className="row" onSubmit={datosDeEnvio}>
                <h4
                  className="text-center mb-2 mt-2 pb-2"
                  style={{ borderBottom: "1px solid #80808038" }}
                >
                  Datos de envío
                </h4>

                <div className="col-md-6 mt-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setDepartamento(e.target.value);
                    }}
                    required
                  >
                    <option hidden value="">
                      Departamento.
                    </option>
                    <option value="Artigas">Artigas</option>
                    <option value="Canelones">Canelones</option>
                    <option value="Cerro Largo">Cerro Largo</option>
                    <option value="Colonia">Colonia</option>
                    <option value="Durazno">Durazno</option>
                    <option value="Flores">Flores</option>
                    <option value="Florida">Florida</option>
                    <option value="Lavalleja">Lavalleja</option>
                    <option value="Maldonado">Maldonado</option>
                    <option value="Montevideo">Montevideo</option>
                    <option value="Paysandú">Paysandú</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Rivera">Rivera</option>
                    <option value="Rocha">Rocha</option>
                    <option value="Salto">Salto</option>
                    <option value="San José">San José</option>
                    <option value="Soriano">Soriano</option>
                    <option value="Tacuarembó">Tacuarembó</option>
                    <option value="Treinta y Tres">Treinta y Tres</option>
                  </select>
                </div>

                <div className="col-md-6 mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Barrio."
                    aria-label="Barrio"
                    aria-describedby="basic-addon1"
                    value={barrio}
                    onChange={ (e)=> setBarrio(e.target.value) }
                    required
                  />
                </div>

                <div className="col-md-6 mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dirección."
                    aria-label="Direccion"
                    aria-describedby="basic-addon1"
                    value={direccion}
                    onChange={ (e)=> setDireccion(e.target.value) }
                    required
                  />
                </div>

                <div className="col-md-6 mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Telefono de contacto."
                    aria-label="Telefono"
                    aria-describedby="basic-addon1"
                    value={telefono}
                    onChange={ (e)=> setTelefono(e.target.value) }
                    required
                  />
                </div>

                <div className="col-md-12 mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del destinatario."
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    value={nombreDelDestinatario}
                    onChange={ (e)=> setNombreDelDestinatario(e.target.value) }
                    required
                  />
                </div>

                <div className="col-md-12 mt-4">
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Comentarios adicionales."
                    style={{ resize: "none" }}
                    value={comentariosAdicionales}
                    onChange={ (e)=> setComentariosAdicionales(e.target.value) }
                  ></textarea>
                </div>

                <div
                  className="text-center mt-4 pt-4"
                  style={{ borderTop: "1px solid #80808038" }}
                >
                  <button
                    className="btn btn-danger boton-login-adm"
                    type="submit"
                    //onClick={() =>{ navigate('/envio') }}
                  >
                    Continuar
                  </button>
                </div>
              </form>
            ) : (
              <form className="row" onSubmit={datosDeEnvio}>
                <h4
                  className="text-center mb-4 mt-2 pb-2"
                  style={{ borderBottom: "1px solid #80808038" }}
                >
                  Retire su compra
                </h4>

                <div className="col-md-7">
                  <h5>Galeria Uruguay</h5>
                  <p className="my-4">Av. 18 de Julio 966</p>
                  <p className="my-4">
                    Visita nuestra tienda de Lunes a Sábados de 9 a 21 hs /
                    Domingos de 9 a 21 hs
                  </p>
                  <h5 className="my-4">
                    Te notificaremos via mail cuando tu compra esté pronta para
                    ser retirada.
                  </h5>

                  <div className="col-md-12 mt-5 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Telefono de contacto."
                      aria-label="Telefono"
                      aria-describedby="basic-addon1"
                      value={telefono}
                      onChange={ (e)=> setTelefono(e.target.value) }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-5 d-block" style={{ minHeight: "20vh" }}>
                  <MapContainer
                    center={position}
                    zoom={16}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                      <Popup>
                        DripDrop
                        <br />
                        Av. 18 de Julio 966.
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div
                  className="text-center mt-4 pt-4"
                  style={{ borderTop: "1px solid #80808038" }}
                >
                  <button
                    className="btn btn-danger boton-login-adm"
                    type="submit"
                    //onClick={() =>{ navigate('/envio') }}
                  >
                    Continuar
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="pb-2 text-center" style={{ color: 'red' }}>
            {message}
          </div>

        </div>
      </div>

      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  );
}

export default Envio;
