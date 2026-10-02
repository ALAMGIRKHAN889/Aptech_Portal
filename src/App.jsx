import { useState, useRef } from "react";
import "./App.css";
import Logo from "./Logo";
import Login from "./Login";
import { auth } from "./auth";
import attendanceLogo from "./assets/favicon.png";

const PORTFOLIO = "https://portfolio-web-psi-rosy.vercel.app/";

const menu = [
  { id: "services", icon: "▦", label: "Services" },
  { id: "notifications", icon: "♧", label: "Notifications" },
  { id: "profile", icon: "♙", label: "Profile" },
];

const services = [
  { name: "Attendance Report Cleaning", img: attendanceLogo, color: "plain", desc: "Clean, process and prepare attendance reports automatically.", url: "https://aptech-attandance-report-cleaning.vercel.app/" },
  { name: "Application Forms", icon: "♙", color: "green", desc: "Access and submit various application forms." },
  { name: "Profile Management", icon: "👤", color: "purple", desc: "Update your personal and account information." },
  { name: "Request Services", icon: "📋", color: "orange", desc: "Raise a request for your required service." },
  { name: "Appointments", icon: "📅", color: "cyan", desc: "Book and manage your appointments." },
  { name: "Payments", icon: "💳", color: "cyan", desc: "View and make payments for your services." },
  { name: "Track Requests", icon: "📋", color: "red", desc: "Check the status of your submitted requests." },
  { name: "Document Upload", icon: "☁", color: "indigo", desc: "Upload and manage your documents." },
  { name: "Support", icon: "🎧", color: "cyan", desc: "Get help and contact our support team." },
  { name: "Settings", icon: "⚙", color: "purple", desc: "Manage your preferences and portal settings." },
];

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <Logo />
        <div className="logo-text">
          <b>AK × Aptech</b>
          <small>Portal</small>
        </div>
      </div>
      <nav className="menu">
        {menu.map((m) => (
          <a
            key={m.id}
            href="#"
            className={`menu-item ${page === m.id ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setPage(m.id); }}
          >
            <span className="menu-icon">{m.icon}</span>
            <span className="menu-text">{m.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Topbar({ user, search, setSearch, showSearch, onLogout }) {
  return (
    <header className="topbar">
      {showSearch ? (
        <div className="search">
          🔍
          <input type="text" placeholder="Search for services..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      ) : (
        <div />
      )}
      <div className="top-space" />
      <span className="made-by">Made by <b>AK</b></span>
      <a className="portfolio-btn" href={PORTFOLIO} target="_blank" rel="noopener noreferrer">
        Visit Portfolio ↗
      </a>
      <div className="profile">
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
        <span className="profile-name">{user.name}</span>
        <button className="logout" onClick={onLogout} title="Log out">⎋</button>
      </div>
    </header>
  );
}

function ServiceCard({ service, index, onSoon }) {
  const soon = !service.url;
  const handleClick = () => (soon ? onSoon(service.name) : window.open(service.url, "_blank", "noopener"));
  return (
    <div
      className="service-card"
      style={{ "--i": index }}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleClick())}
    >
      {soon && <span className="soon-tag">Available soon</span>}
      <div className={`service-icon ${service.color}`}>
        {service.img ? <img src={service.img} alt="" /> : service.icon}
      </div>
      <h3>{service.name}</h3>
      <p>{service.desc}</p>
      <div className="arrow">→</div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => auth.getUser());
  const [page, setPage] = useState("services");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const timer = useRef();

  if (!user) return <Login onLogin={(name) => setUser(auth.login(name))} />;

  const logout = () => { auth.logout(); setUser(null); setPage("services"); };
  const showToast = (name) => {
    setToast(`${name} will be available soon.`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2500);
  };
  const q = search.toLowerCase().trim();
  const filtered = services.filter((s) => s.name.toLowerCase().includes(q));

  return (
    <div className="portal">
      <Sidebar page={page} setPage={setPage} />
      <main className="main">
        <Topbar user={user} search={search} setSearch={setSearch} showSearch={page === "services"} onLogout={logout} />
        <section className="content" key={page}>
          {page === "services" && (
            <>
              <div className="page-title">
                <h1>Services<span className="count">{filtered.length}</span></h1>
                <p>Welcome, {user.name}. Access all available services in one place.</p>
              </div>
              <div className="services-grid">
                {filtered.map((s, i) => (
                  <ServiceCard key={s.name} service={s} index={i} onSoon={showToast} />
                ))}
              </div>
              {filtered.length === 0 && <div className="empty">No service found for “{search}”.</div>}
            </>
          )}
          {page === "notifications" && (
            <>
              <div className="page-title"><h1>Notifications</h1><p>Your latest updates.</p></div>
              <div className="empty">You're all caught up. No new notifications.</div>
            </>
          )}
          {page === "profile" && (
            <>
              <div className="page-title"><h1>Profile</h1><p>Your account information.</p></div>
              <div className="profile-card">
                <div className="avatar big">{user.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h2>{user.name}</h2>
                  <p>Portal user</p>
                </div>
                <button className="logout-btn" onClick={logout}>Log out</button>
              </div>
            </>
          )}
        </section>
      </main>
      <div className={`toast ${toast ? "show" : ""}`} role="status">{toast}</div>
    </div>
  );
}
