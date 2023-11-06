import React, { useEffect, useState } from 'react';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('/api/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data));
  }, []);

  return (
    <div>
      <h1>Categorias</h1>
      {categorias.map(categoria => (
        <div key={categoria.id}>
          <h2>{categoria.nombre}</h2>
          <p>{categoria.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default Categorias;