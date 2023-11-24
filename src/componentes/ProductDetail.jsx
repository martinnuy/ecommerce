import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LoadSpinner from "./LoadSpinner";
import "../hojas-de-estilos/ProductDetail.css";

const ProductDetail = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Azul");
  const [isFavorite, setIsFavorite] = useState(false);

  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Ccargar datos desde una API
    fetch(process.env.REACT_APP_API_URI + `/productos/slug/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details", error));
  }, [slug]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return <LoadSpinner center="true" />;
  }

  return (
    <div>
      <Nav />
      <div className="div-principal">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <img src={product.img} alt="Product" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <h2 className="mb-4">
                {product.nombre}
                <Link className="red-hover-link px-3" onClick={toggleFavorite}>
                  {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                </Link>
              </h2>
              <p className="lead mb-4">
                Cada detalle está cuidadosamente diseñado para destacar tu
                individualidad. Sumérgete en la suavidad de los materiales
                premium y eleva tu estilo con confianza.
              </p>
              <div className="mb-4">
                <h4>
                  $
                  {product.precio
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </h4>
              </div>
              <div className="mb-4">
                <span className="text-muted">Disponibilidad:</span> En stock
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />

                <div className="mt-3 rounded-pill d-inline-block" style={{ alignItems: 'center', backgroundColor: '#e2e2e2' }}>
                  <button
                    className="btn btn-danger rounded-pill d-inline counter-button"
                  >
                    -
                  </button>
                  <div className="d-inline counter-input-div">
                    <input
                      type="number"
                      id="quantity"
                      className="form-control counter-input d-inline"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                  </div>
                  <button
                    className="btn btn-danger rounded-pill d-inline counter-button"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="size" className="form-label">
                  Talle:
                </label>
                <div>
                  <button
                    type="button"
                    class="btn p-0 btn-outline-dark mx-2 custom-color-button"
                  >
                    S
                  </button>
                  <button
                    type="button"
                    class="btn p-0 btn-outline-dark mx-2 custom-color-button"
                  >
                    M
                  </button>
                  <button
                    type="button"
                    class="btn p-0 btn-outline-dark mx-2 custom-color-button"
                  >
                    L
                  </button>
                  <button
                    type="button"
                    class="btn p-0 btn-outline-dark mx-2 custom-color-button"
                  >
                    XL
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="form-label">
                  Color:
                </label>
                <select
                  id="color"
                  className="form-select"
                  value={color}
                  onChange={handleColorChange}
                >
                  <option value="Rojo">Rojo</option>
                  <option value="Azul">Azul</option>
                  <option value="Verde">Verde</option>
                  <option value="Negro">Negro</option>
                </select>

                <button
                  type="button"
                  class="btn custom-color-button mt-3 mx-2"
                  style={{ backgroundColor: "black" }}
                ></button>
                <button
                  type="button"
                  class="btn custom-color-button mt-3 mx-2"
                  style={{ backgroundColor: "white" }}
                ></button>
              </div>
              <div></div>
              <button className="col-md-12 mt-2 btn btn-danger boton-login-adm">
                Comprar ahora
              </button>
              <button className="col-md-12 mt-2 btn btn-secondary">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer infiniteTextValue={props.infiniteTextValue} />
    </div>
  );
};

export default ProductDetail;