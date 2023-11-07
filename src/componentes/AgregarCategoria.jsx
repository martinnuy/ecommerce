import React, { useState } from 'react'

function AgregarCategoria() {

    //Esta funcion se encarga de traer la lista de categorias desde la base de datos y ponerlas en el <select> correspondiente
    const getCategories = async () =>{
        try {
            const response = await fetch( process.env.REACT_APP_API_URI + '/categoria', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
              },
            });
      
            if (response.status === 200) {
                const data = await response.json();
                const selectCat = document.getElementById('categoriasSelect2');
                
                //Si la respuesta es correcta se agregan las categorias de la base de datos al select.
                data.forEach(element => {
                    const options = selectCat.options;
                    const optionCatChildren = Array.from(options).map(option => option.value);
                    
                    if( !optionCatChildren.includes(element.nombre.toLowerCase()) ){
                        
                        const optionCat = document.createElement('option');
                        optionCat.innerHTML = element.nombre;
                        optionCat.value = element.nombre.toLowerCase();
                        optionCat.id = element._id;
                        selectCat.appendChild(optionCat);
                    }
                });

            } else {
              throw new Error('Autenticación fallida');
            }
          } catch (error) {
            console.log(error);
          }
    }
    //Se llama a la funcion.
    getCategories();

    const [message, setMessage] = useState('');
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState(``);
    const [categoriaEliminar, setCategoriaEliminar] = useState('');
    const [messageColor, setMessageColor] = useState(''); 

  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // Obtener el token del Local Storage
      const token = localStorage.getItem('token');
  
      // Crear un objeto FormData para enviar datos del formulario
      const formData = new FormData();
      formData.append('nombre', nombre);

      try {
        // Enviar la solicitud POST al servidor con el token en el encabezado
        const response = await fetch( process.env.REACT_APP_API_URI + '/categoria', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}` // Agregar el token al encabezado
          }
        });
  
        if (response.ok) {
          // Mostrar un mensaje de éxito
          setMessage('Categoria agregada exitosamente');
          setMessageColor('green');
                // Limpiar el formulario
            setNombre('');
        } else {
          throw new Error('Error al agregar la categoria');
        }
    } catch (error) {
        // Mostrar un mensaje de error
        setMessage('Error: ' + error.message);
        setMessageColor('red');
      }
  
    };

    const handleFormSubmitDelete = async (event) => {
        event.preventDefault();
    
        // Obtener el token del Local Storage
        const token = localStorage.getItem('token');
    
        // Crear un objeto FormData para enviar datos del formulario
        const formData = new FormData();
        formData.append('nombre', nombre);
  
        try {
          // Enviar la solicitud POST al servidor con el token en el encabezado
          const response = await fetch( process.env.REACT_APP_API_URI + '/categoria/' + categoriaEliminar, {
            method: 'DELETE',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}` // Agregar el token al encabezado
            }
          });
    
          if (response.ok) {
            // Mostrar un mensaje de éxito
            setMessage('Categoria eliminada exitosamente');
            setMessageColor('green');
            // Limpiar el formulario
            setCategoria('');
            document.getElementById(categoriaEliminar).remove();
            
          } else {
            throw new Error('Error al eliminar la categoria');
          }
      } catch (error) {
          // Mostrar un mensaje de error
          setMessage('Error: ' + error.message);
          setMessageColor('red');
        }
    
      };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="form-container">
        <form className='mb-5' onSubmit={handleFormSubmit} id="formAgregarCategoria">
          <h1 className="text-center">Agregar Categoria</h1>
          <div className="mb-3">
            <input
              id="nombreInput"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              placeholder="Nueva Categoria"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-danger boton-login-adm">Agregar Categoria</button>
          </div>
        </form>

        
        <form className='mt-5' onSubmit={handleFormSubmitDelete} id="formEliminarCategoria">
          <h1 className="text-center">Eliminar Categoria</h1>
          <div className="mb-3 mt-3">
            <select
              id='categoriasSelect2'
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                setCategoriaEliminar(e.target.options[e.target.selectedIndex].id);
            }}
              className="form-select"
              required
            >
              <option disabled value=''> -- Categorias Actuales -- </option>

            </select>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-danger boton-login-adm">Eliminar Categoria</button>
          </div>
        </form>
    


        <div className='text-center mt-2' id="message" style={{ color: messageColor }}>{message}</div>
      </div>
    </div>
  )
}

export default AgregarCategoria