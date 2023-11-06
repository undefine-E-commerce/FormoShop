import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../admin.css";

const Tiendas = () => {
  const [tiendasData, setTiendasData] = useState([]);
  const [nuevaTienda, setNuevaTienda] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    imagen_url: "",
    vendedor: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedTienda, setSelectedTienda] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();

    obtenerTiendas();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsuarios(response.data.usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };
  const obtenerTiendas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/stores");
      setTiendasData(response.data.tiendas);
    } catch (error) {
      console.error("Error al obtener tiendas", error);
    }
  };

  const handleCrearTienda = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/stores/create-store",
        nuevaTienda
      );
      console.log("Tienda creada exitosamente", response.data);
      obtenerTiendas();
    } catch (error) {
      console.error("Error al crear tienda", error);
    }
  };

  const handleObtenerTienda = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/stores/${id}`
      );
      setSelectedTienda(response.data.tienda);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener tienda", error);
    }
  };

  const handleActualizarTienda = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/stores/update-store/${id}`,
        nuevaTienda
      );
      console.log("Tienda actualizada exitosamente", response.data);
      obtenerTiendas();
    } catch (error) {
      console.error("Error al actualizar tienda", error);
    }
  };

  const handleEliminarTienda = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/stores/delete-store/${id}`
      );
      console.log("Tienda eliminada exitosamente", response.data);
      obtenerTiendas();
    } catch (error) {
      console.error("Error al eliminar tienda", error);
    }
  };

  const handleChange = (e) => {
    setNuevaTienda({
      ...nuevaTienda,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Tiendas</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen URL</th>
            <th>Vendedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiendasData.map((tienda) => (
            <tr key={tienda.id}>
              <td>{tienda.id}</td>
              <td>{tienda.nombre}</td>
              <td>{tienda.descripcion}</td>
              <td>{tienda.vendedor}</td>
              <td>{tienda.imagen_url}</td>
              <td>
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-primary my-1"
                    onClick={() => handleActualizarTienda(tienda.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-success my-1"
                    onClick={() => handleObtenerTienda(tienda.id)}
                  >
                    Mostrar
                  </button>
                  <button
                    className="btn btn-danger my-1"
                    onClick={() => handleEliminarTienda(tienda.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="create">
        <h2>Crear Tienda</h2>
        <div className="input-fields">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevaTienda.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={nuevaTienda.descripcion}
            onChange={handleChange}
          />
          <input
            type="text"
            name="imagen_url"
            placeholder="Imagen URL"
            value={nuevaTienda.imagen_url}
            onChange={handleChange}
          />
          <select
            name="vendedor"
            value={nuevaTienda.vendedor}
            onChange={handleChange}
          >
            <option value="">Selecciona un vendedor</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.id}
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" onClick={handleCrearTienda}>
          Crear Tienda
        </button>
      </div>
      {showModal && selectedTienda && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tienda</h2>
            <p>Nombre: {selectedTienda.nombre}</p>
            <p>Descripción: {selectedTienda.descripcion}</p>
            <p>Imagen URL: {selectedTienda.imagen_url}</p>
            <button className="btn btn-danger" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tiendas;
