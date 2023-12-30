import React, { useState } from "react";
import { useQuery } from "react-query";
import Subtitulo from "./Subtitulo";
import { format } from "date-fns";
import LoadSpinner from "./LoadSpinner";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

function CodigoDeDescuento() {
    const [codigo, setCodigo] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
    const [fechaDeExpiracion, setFechaDeExpiracion] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); 


  const {
    data: traerUsuarios,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    "codigos", // Clave única para la consulta
    async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token válido.");
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/categoria/codigodescuento/get`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      return data;
    },
    {
      staleTime: 60000, // Establece un período de caché de 60 segundos
    }
  );
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Obtener el token del Local Storage
    const token = localStorage.getItem('token');

    // Crear un objeto FormData para enviar datos del formulario
    const formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('porcentaje', porcentaje);
    formData.append('expiresAt', fechaDeExpiracion);

    
    try {
      // Enviar la solicitud POST al servidor con el token en el encabezado
      const response = await fetch( process.env.REACT_APP_API_URI + '/categoria/codigodescuento', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}` // Agregar el token al encabezado
        }
      });

      if (response.ok) {
        // Mostrar un mensaje de éxito
        setMessage('Codigo agregado exitosamente');
        setMessageColor('green');
              // Limpiar el formulario
          setCodigo('');
          setPorcentaje('');
          setFechaDeExpiracion('');
          refetch();
      } else {
        const errorFromServer = await response.json();
        throw new Error(errorFromServer.error);
      }
  } catch (error) {
      // Mostrar un mensaje de error
      setMessage('Error: ' + error.message);
      setMessageColor('red');
    }

  };

  const deleteCode = async (codigoAEliminar) => {

    // Obtener el token del Local Storage
    const token = localStorage.getItem('token');

    // Crear un objeto FormData para enviar datos del formulario
    const formData = new FormData();
    formData.append('codigo', codigoAEliminar);

    try {
      // Enviar la solicitud POST al servidor con el token en el encabezado
      const response = await fetch( process.env.REACT_APP_API_URI + '/categoria/codigodescuento/delete', {
        method: 'DELETE',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}` // Agregar el token al encabezado
        }
      });

      if (response.ok) {
        // Mostrar un mensaje de éxito
        setMessage('Codigo eliminado exitosamente');
        setMessageColor('green');
        refetch();
      } else {
        const errorFromServer = await response.json();
        throw new Error(errorFromServer.error);
      }
  } catch (error) {
      // Mostrar un mensaje de error
      setMessage('Error: ' + error.message);
      setMessageColor('red');
    }

  }


  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return <div className="div-principal">Error al obtener los datos</div>;
  }

  return (
    <div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="form-container">
          <form id="formAgregarCodigo" onSubmit={handleFormSubmit}>
            <h1 className="text-center">Crear codigo de descuento</h1>

            <div className="mb-3">
              <input
                id="codigoInput"
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="form-control"
                placeholder="Nuevo codigo"
                required
              />
            </div>
            <div className="mb-3">
              <input
                id="porcentajeInput"
                type="text"
                value={porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
                className="form-control"
                placeholder="Porcentaje de descuento"
                required
              />
            </div>
            <div className="mb-3">
              <input
                id="expiracionInput"
                type="date"
                value={fechaDeExpiracion}
                onChange={(e) => setFechaDeExpiracion(e.target.value)}
                className="form-control"
                placeholder="Fecha de expiracion del codigo"
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-danger boton-login-adm">
                Agregar Codigo
              </button>
            </div>
        <div className='text-center mt-2' id="message" style={{ color: messageColor }}>{message}</div>
          </form>
          <div className="">
            <Subtitulo titulo="Codigos actuales" />
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Codigo</th>
                  <th scope="col">Descuento</th>
                  <th scope="col">Creacion</th>
                  <th scope="col">Expiracion</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {traerUsuarios.map((p, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "table-danger" : "table-light"
                    }`}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{p.codigo}</td>
                    <td>% {p.porcentaje} Off</td>
                    <td>{format(new Date(p.createdAt), "dd/MM/yyyy")}</td>
                    <td>{format(new Date(p.expiresAt), "dd/MM/yyyy")}</td>
                    <td className="text-center">
                      <Link
                        className="red-hover-link"
                        to=""
                        onClick={() => deleteCode(p.codigo)}
                      >
                        {" "}
                        <FaTrashCan />{" "}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodigoDeDescuento;
