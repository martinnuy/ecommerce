import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Subtitulo from "./Subtitulo";
import "../hojas-de-estilos/ProductGallery.css";
import SubscriptionDiv from './SubscriptionDiv';

function UserInfo(props) {
  const [data, setData] = useState(null);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState("");

  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [messageEmail, setMessageEmail] = useState("");

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [messagePassword, setMessagePassword] = useState("");
  
  const [messageColor, setMessageColor] = useState("");
  const [reloadData, setReloadData] = useState(false);

  const changeUserInfo = async (e) => {
    e.preventDefault();

    if ((name !== data.name && lastName !== data.lastName) && (name || lastName)) {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URI + "/users/updatename",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lastname: lastName }),
          }
        );

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
          setMessage("Datos guardados con exito.");
          setMessageColor("green");
          setName('');
          setLastName('');
          setReloadData(!reloadData);
        } else {
          const errorData = await response.json();
          setMessage(errorData.message);
          setMessageColor("red");
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  const changeEmailInfo = async (e) => {
    e.preventDefault();

    if (newEmail && emailPassword && (newEmail !== data.email)) {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URI + "/users/emailupdate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newEmail, password: emailPassword }),
          }
        );

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
          const respuesta = await response.json();
          setMessageEmail( respuesta.message );
          setMessageColor("green");
          setNewEmail('');
          setEmailPassword('');
          setReloadData(!reloadData);
        } else {
            const errorData = await response.json();
            setMessageEmail(errorData.message);
            setMessageColor("red");
            throw new Error(errorData.message);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        
      }
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if ( (password && newPassword && newPasswordConfirm) && (newPassword === newPasswordConfirm) && ( newPassword.length >= 3 && newPassword.length <= 99 ) ) {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URI + "/users/updatepassword",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirm }),
          }
        );

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
          const respuesta = await response.json();
          setMessagePassword( respuesta.message );
          setMessageColor("green");
          setPassword('');
          setNewPassword('');
          setNewPasswordConfirm('');
          setReloadData(!reloadData);
        } else {
            const errorData = await response.json();
            setMessagePassword(errorData.message);
            setMessageColor("red");
            throw new Error(errorData.message);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        
      }
    }
  };

  const fetchDataWithToken = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "/users/getone",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  useEffect(() => {
    // Llamar a la función para realizar la solicitud con token
    fetchDataWithToken();
  }, [reloadData]);
  return (
    <div>
      <Nav />

      <div className="div-contenedor-productos">
        <Subtitulo titulo={props.titulo} />

        <form className="col-11 col-md-4 mx-auto border p-5" onSubmit={changeUserInfo}>
          <h5 className="text-center">Cambiar Información personal</h5>
          <div className="form-group my-3">
            <label htmlFor="exampleInputNombre">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputNombre"
              aria-describedby="nombreHelp"
              placeholder={data ? data.name : "Nombre"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputApellido">Apellido:</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputApellido"
              aria-describedby="apellidoHelp"
              placeholder={data ? data.lastname : "Apellido"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger my-3 boton-login-adm"
            >
              Guardar
            </button>
          </div>

          <div className="mt-2 text-center" style={{ color: messageColor }}>
            {message}
          </div>
        </form>

        <form className="col-11 col-md-4 mx-auto border p-5 mt-5" onSubmit={changeEmailInfo}>
          <h5 className="text-center">Cambiar email</h5>
          <div className="form-group">
            <label htmlFor="exampleInputEmail2">Ingrese su nuevo email</label>
            <input
              type="email"
              className="form-control mb-3 mt-3"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              placeholder={data ? data.email : "Email"}
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
              required
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPasswordEmail" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPasswordEmail"
              onChange={(e) => setEmailPassword(e.target.value)}
              value={emailPassword}
              required
            />
          </div>
            <small id="emailHelp" className="form-text text-muted">
              Se enviara un correo de confirmación a dirección actual y a su nueva dirección.
            </small>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger my-3 boton-login-adm"
            >
              Guardar
            </button>
          </div>

          <div className="mt-2 text-center" style={{ color: messageColor }}>
            {messageEmail}
          </div>
        </form>

        <form className="col-11 col-md-4 mx-auto border p-5 mt-5 mb-5" onSubmit={changePassword}>
          <h5 className="text-center">Cambiar contraseña</h5>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contraseña actual:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Nueva contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword3" className="form-label">
              Repetir nueva contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword3"
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              value={newPasswordConfirm}
              required
            />
          </div>
          <small id="passwordHelp" className="form-text text-muted">
            Se enviara un correo de confirmación a su dirección actual.
          </small>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger my-3 boton-login-adm"
            >
              Guardar
            </button>
          </div>

          <div className="mt-2 text-center" style={{ color: messageColor }}>
            {messagePassword}
          </div>
        </form>
      
      <SubscriptionDiv />
      
      </div>


      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  );
}

export default UserInfo;
