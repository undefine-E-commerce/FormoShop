import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/users">
            Users
          </NavLink>

          <NavLink className="nav-item nav-link" to="/stores">
            Stores
          </NavLink>
          <NavLink className="nav-item nav-link" to="/products">
            Products
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
