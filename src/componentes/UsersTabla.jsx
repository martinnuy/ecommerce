import React from "react";
import Subtitulo from "./Subtitulo";
import { useQuery } from 'react-query';
import LoadSpinner from "./LoadSpinner";
import { format } from 'date-fns';


function UsersTabla() {


    const { data: traerUsuarios, isLoading, isError } = useQuery(
      'userData', // Clave única para la consulta
      async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se proporcionó un token válido.');
        }
  
        const response = await fetch(`${process.env.REACT_APP_API_URI}/users`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
  
        const data = await response.json();
        return data;
      },
      {
        staleTime: 60000, // Establece un período de caché de 60 segundos
      }
    );
  
  

  if (isLoading) {
    return (
      <LoadSpinner />
      )
  }

  if (isError) {
    return <div className="div-principal">Error al obtener los datos</div>;
  }

  return (

    
    <div className="div-principal">
      <Subtitulo titulo="Informacion de Usuarios" />
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Verificado</th>
            <th scope="col">Novedades</th>
            <th scope="col">Registro</th>
            <th scope="col">Ultimo Login</th>
            <th scope="col">Nº Compras</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>

        {traerUsuarios.map((p, index) => (
          <tr key={index} className={`${(index % 2) === 0 ? 'table-danger' : 'table-light'}`}>
            <th scope="row">{index + 1}</th>
            <td>{ p.username }</td>
            <td>{ p.email }</td>
            <td>{ p.verificado ? 'Si' : 'No' }</td>
            <td>{ p.recibirNovedadesPorEmail ? 'Suscrito' : 'No suscrito' }</td>
            <td>{ format(new Date(p.createdAt), 'dd/MM/yyyy - HH:mm') }</td>
            <td>{ format(new Date(p.lastLogin), 'dd/MM/yyyy - HH:mm') }</td>
            <td>{ p.numeroDeCompras }</td>
            <td>{ p.role }</td>
          </tr>
        ))}

        </tbody>
      </table>
    </div>
  );
}

export default UsersTabla;
