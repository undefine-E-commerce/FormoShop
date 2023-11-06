import React, { useEffect, useState } from "react";
import axios from "axios";

const Tiendas = () => {
  const [tiendasData, setTiendasData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/stores")
      .then((response) => setTiendasData(response.data.tiendas))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Tiendas</h1>
      {tiendasData.map((tienda) => (
        <div key={tienda.id}>
          <h2>
            {tienda.nombre} {tienda.apellido}
          </h2>
          <p>DNI: {tienda.dni}</p>
          <p>Email: {tienda.email}</p>
          <p>Nick Name: {tienda.nick_name}</p>
        </div>
      ))}
    </div>
  );
};

export default Tiendas;
