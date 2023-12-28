import React, { useState } from 'react'

function AgregarProducto() {

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
                const selectCat = document.getElementById('categoriasSelect');
                
                //Si la respuesta es correcta se agregan las categorias de la base de datos al select.
                data.forEach(element => {
                    const options = selectCat.options;
                    const optionCatChildren = Array.from(options).map(option => option.value);
                    
                    if( !optionCatChildren.includes(element.nombre.toLowerCase()) ){
                        
                        const optionCat = document.createElement('option');
                        optionCat.innerHTML = element.nombre;
                        optionCat.value = element.nombre.toLowerCase();
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
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState(``);
    const [imagen, setImagen] = useState(null);
    const [talles, setTalles] = useState('');
    const [tallesStock, setTallesStock] = useState('');
    const [color, setColor] = useState('');
    const [colorValue, setColorValue] = useState('#000000');
    const [descripcion, setDescripcion] = useState('');
    const [stockTotal, setStockTotal] = useState(0);

    const [arrayTalles, setArrayTalles] = useState([]); 

    const [messageColor, setMessageColor] = useState(''); 

  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // Obtener el token del Local Storage
      const token = localStorage.getItem('token');
  
      // Crear un objeto FormData para enviar datos del formulario
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('precio', precio);
      formData.append('categoria', categoria);
      formData.append('img', imagen);
      formData.append('tallesDisponibles', JSON.stringify(arrayTalles));
      formData.append('descripcion', descripcion);
      formData.append('stock', stockTotal);
      formData.append('coloresDisponibles', JSON.stringify([ { nombreDelColor: color, valorDelColor: colorValue } ]));

      
      try {
        // Enviar la solicitud POST al servidor con el token en el encabezado
        const response = await fetch( process.env.REACT_APP_API_URI + '/productos', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}` // Agregar el token al encabezado
          }
        });
  
        if (response.ok) {
          // Mostrar un mensaje de éxito
          setMessage('Producto agregado exitosamente');
          setMessageColor('green');
                // Limpiar el formulario
            setNombre('');
            setPrecio('');
            setCategoria('');
            setImagen(null);
            setTalles('');
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

    const agregarTalle = () => {
      if( talles && tallesStock && parseInt(tallesStock) > 0 && !arrayTalles.some(objeto => objeto.talle === talles)){
        const nuevoTalle = {
          talle : talles,
          stock : parseInt(tallesStock),
        }

        setStockTotal( stockTotal + parseInt(tallesStock) );
        setArrayTalles( [...arrayTalles, nuevoTalle] );
      }
    }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="form-container">
        <form onSubmit={handleFormSubmit} id="formAgregarProducto">
          <h1 className="text-center">Agregar Producto</h1>
          <div className="mb-3">
            <input
              id="nombreInput"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              placeholder="Nombre del producto"
              required
            />
          </div>
          <div className="mb-3">
            <input
              id="precioInput"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="form-control"
              placeholder="Precio"
              required
            />
          </div>
          <div className="mb-3">
            <select
              id='categoriasSelect'
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="form-select"
              required
            >
              <option disabled value=''> -- Categorias -- </option>

            </select>
          </div>
          <div className="mb-3">
            <input
              type="file"
              onChange={(e) => setImagen(e.target.files[0])}
              className="form-control"
              required
            />
          </div>
          <div className='text-center'>
            <div className="mb-3 mx-2 col-md-4 d-inline-block">
              <input
                id="tallasInput"
                type="text"
                value={talles}
                onChange={(e) => setTalles(e.target.value)}
                className="form-control"
                placeholder="Tallas disponibles"
                required
              />
            </div>
            <div className="mb-3 mx-2 col-md-4 d-inline-block">
              <input
                id="stockInput"
                type="number"
                value={tallesStock}
                onChange={(e) => setTallesStock(e.target.value)}
                className="form-control"
                placeholder="Stock para esta talla"
                required
              />
            </div>
            <button
                className="btn mx-2 btn-outline-danger btn-m ml-2"
                type="button"
                onClick={ () => agregarTalle() }
              >
                Aplicar
              </button>

              {
                arrayTalles.map((elemento, index) => (
                  <div key={index}>
                    <p>Talle: {elemento.talle} - Stock: {elemento.stock}</p>
                  </div>
                ))
              }
          </div>

          <div className="col-md-12 mb-3">
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Descripcion del producto."
                    style={{ resize: "none" }}
                    value={descripcion}
                    onChange={ (e)=> setDescripcion(e.target.value) }
                  ></textarea>
          </div>

          <div className='text-center'>
            <div className="mb-3 mx-2 col-md-4 d-inline-block">
              <input
                id="colorInput"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="form-control"
                placeholder="Nombre del color"
                required
              />
            </div>
            <div className="mb-3 mx-2 col-md-4 d-inline-block">
              <input
                id="coloValueInput"
                type="color"
                value={colorValue}
                onChange={(e) => setColorValue(e.target.value)}
                className="form-control"
                placeholder="Valor del color"
                required
              />
            </div>

          </div>

              <h5 className='text-center mb-3'>Stock Total: {stockTotal}</h5>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-danger boton-login-adm">Agregar Producto</button>
          </div>
        </form>
        <div className='text-center mt-2' id="message" style={{ color: messageColor }}>{message}</div>
      </div>
    </div>
  )
}

export default AgregarProducto