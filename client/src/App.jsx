import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Productos from "./Components/crudtest/Productos/Productos";
import Tiendas from "./Components/crudtest/Tiendas/Tiendas";
import Usuarios from "./Components/crudtest/Usuarios/Usuarios";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Productos />} />
          <Route path="/stores" element={<Tiendas />} />
          <Route path="/users" element={<Usuarios />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
