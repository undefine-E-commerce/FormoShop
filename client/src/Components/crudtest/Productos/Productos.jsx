import React, { useEffect, useState } from "react";
import axios from "axios";

const Productos = () => {
  const [productosData, setProductosData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => setProductosData(response.data.productos))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      {productosData.map((productos) => (
        <div key={productos.id}>
          <h2>
            {productos.nombre} {productos.apellido}
          </h2>
          <p>DNI: {productos.dni}</p>
          <p>Email: {productos.email}</p>
          <p>Nick Name: {productos.nick_name}</p>
        </div>
      ))}
    </div>
  );
};

export default Productos;
