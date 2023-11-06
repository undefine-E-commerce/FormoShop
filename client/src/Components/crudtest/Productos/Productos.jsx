import React, { useEffect, useState } from "react";
import axios from "axios";
import "../admin.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    titulo: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    tienda: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tiendas, setTiendas] = useState([]);

  useEffect(() => {
    obtenerTiendas();
    obtenerProductos();
  }, []);

  const obtenerTiendas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/stores");
      setTiendas(response.data.tiendas);
    } catch (error) {
      console.error("Error al obtener tiendas", error);
    }
  };

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProductos(response.data.productos);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleCrearProducto = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/products/create-product",
        nuevoProducto
      );
      console.log("Producto creado exitosamente", response.data);
      obtenerProductos();
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  };

  const handleObtenerProducto = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      setSelectedProduct(response.data.producto);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener producto", error);
    }
  };

  const handleActualizarProducto = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/update-product/${id}`,
        nuevoProducto
      );
      console.log("Producto actualizado exitosamente", response.data);
      obtenerProductos();
    } catch (error) {
      console.error("Error al actualizar producto", error);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/products/delete-product/${id}`
      );
      console.log("Producto eliminado exitosamente", response.data);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Productos</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Tienda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.titulo}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>{producto.tienda}</td>
              <td>
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-primary my-1"
                    onClick={() => handleActualizarProducto(producto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-success my-1"
                    onClick={() => handleObtenerProducto(producto.id)}
                  >
                    Mostrar
                  </button>
                  <button
                    className="btn btn-danger my-1"
                    onClick={() => handleEliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="create-product">
        <h2>Crear Producto</h2>
        <div className="input-fields">
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={nuevoProducto.titulo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={nuevoProducto.categoria}
            onChange={handleChange}
          />
          <select
            name="tienda"
            value={nuevoProducto.tienda}
            onChange={handleChange}
          >
            <option value="">Selecciona una tienda</option>
            {tiendas.map((tienda) => (
              <option key={tienda.id} value={tienda.id}>
                {tienda.nombre}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" onClick={handleCrearProducto}>
          Crear Producto
        </button>
      </div>
      {showModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Producto</h2>
            <p>Título: {selectedProduct.titulo}</p>
            <p>Descripción: {selectedProduct.descripcion}</p>
            <p>Precio: {selectedProduct.precio}</p>
            <p>Categoría: {selectedProduct.categoria}</p>
            <p>Tienda: {selectedProduct.tienda}</p>
            <button className="btn btn-danger" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
