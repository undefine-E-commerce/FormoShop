import React, { useEffect, useState } from "react";
import axios from "axios";

const Usuarios = () => {
  const [usuariosData, setUsuariosData] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    contrasenia: "",
    dni: "",
    email: "",
    nick_name: "",
  });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsuariosData(response.data.usuarios);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCrearUsuario = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/create-user",
        nuevoUsuario
      );
      console.log(response.data);
      obtenerUsuarios();
    } catch (error) {
      console.log(error);
    }
  };

  const handleActualizarUsuario = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/update-user/${id}`,
        nuevoUsuario
      );
      console.log(response.data);
      obtenerUsuarios();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminarUsuario = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/delete-user/${id}`
      );
      console.log(response.data);
      obtenerUsuarios();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Contrasenia</th>
            <th>Nick Name</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.dni}</td>
              <td>{usuario.email}</td>
              <td>{usuario.contrasenia}</td>
              <td>{usuario.nick_name}</td>
              <td>
                <button onClick={() => handleActualizarUsuario(usuario.id)}>
                  Editar
                </button>
                <button onClick={() => handleEliminarUsuario(usuario.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Crear Usuario</h2>
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
        type="text"
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
      <button onClick={handleCrearUsuario}>Crear Usuario</button>
    </div>
  );
};

export default Usuarios;
