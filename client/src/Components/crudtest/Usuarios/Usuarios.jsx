import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../admin.css";

const Usuarios = () => {
  const [usuariosData, setUsuariosData] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    contrasenia: "",
    dni: "",
    email: "",
    nick_name: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsuariosData(response.data.usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const handleCrearUsuario = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/create-user",
        nuevoUsuario
      );
      console.log("Usuario creado exitosamente", response.data);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al crear usuario", error);
    }
  };

  const handleObtenerUsuario = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      setSelectedUser(response.data.usuario);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener usuario", error);
    }
  };

  const handleActualizarUsuario = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/update-user/${id}`,
        nuevoUsuario
      );
      console.log("Usuario actualizado exitosamente", response.data);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    }
  };

  const handleEliminarUsuario = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/delete-user/${id}`
      );
      console.log("Usuario eliminado exitosamente", response.data);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  const handleChange = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Usuarios</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Nick Name</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.dni}</td>
              <td>{usuario.email}</td>
              <td>{usuario.contrasenia}</td>
              <td>{usuario.nick_name}</td>
              <td>
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-primary my-1"
                    onClick={() => handleActualizarUsuario(usuario.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-success my-1"
                    onClick={() => handleObtenerUsuario(usuario.id)}
                  >
                    Mostrar
                  </button>
                  <button
                    className="btn btn-danger my-1"
                    onClick={() => handleEliminarUsuario(usuario.id)}
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
        <h1>Crear Usuario</h1>
        <div className="input-fields">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoUsuario.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={nuevoUsuario.apellido}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={nuevoUsuario.dni}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={nuevoUsuario.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={nuevoUsuario.contrasenia}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nick_name"
            placeholder="Nick Name"
            value={nuevoUsuario.nick_name}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-success" onClick={handleCrearUsuario}>
          Crear Usuario
        </button>
      </div>
      {showModal && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Información de Usuario</h2>
            <p>Nombre: {selectedUser.nombre}</p>
            <p>Apellido: {selectedUser.apellido}</p>
            <p>DNI: {selectedUser.dni}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Contraseña: {selectedUser.contrasenia}</p>
            <p>Nick Name: {selectedUser.nick_name}</p>
            <button className="btn btn-danger" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
