import { Link, NavLink, useLocation } from "react-router-dom";

const menu = [
  { to: "/", label: "Ana sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
];

function Navigation() {
  const { pathname } = useLocation();
  return (
    <nav className="menu" aria-label="Ana gezinme">
      <div className="menu-links">
        {menu.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => isActive || (item.to === "/admin" && pathname.startsWith("/admin")) ? "active" : ""}>{item.label}</NavLink>)}
      </div>
      <div className="menu-account"><Link to="/login">Giriş</Link><Link className="menu-register" to="/register">Kayıt ol <span aria-hidden="true">↗</span></Link></div>
    </nav>
  );
}

export default Navigation;
