import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import type { Category, CampusEvent } from "./types/campus-event";
import { EventProvider } from "./context/EventContext";
import { useEvents } from "./context/use-events";
import { filterByCategory, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];
const TODAY = new Date().toISOString().slice(0, 10);

function PageLayout() {
  const { pathname } = useLocation();
  const pageInfo = getPageInfo(pathname);

  useEffect(() => {
    document.title = `${pageInfo.title} | Kampüs Etkinlikleri`;
  }, [pageInfo.title]);

  return (
    <>
      <Header title={pageInfo.title} text={pageInfo.text} />
      <Navigation />
      <main className={pathname === "/" ? "page-wrap page-home" : "page-wrap"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new" element={<AddEventPage />} />
          <Route path="/admin/:eventId/edit" element={<EditEventPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function getPageInfo(pathname: string) {
  if (pathname === "/") return { title: "Kampüs hayatına karış.", text: "Atölyeler, söyleşiler ve yeni fikirler. Bu hafta kampüste neler var?" };
  if (pathname === "/events") return { title: "Etkinlik takvimi", text: "Kampüsteki yaklaşan etkinlikleri keşfet." };
  if (pathname.startsWith("/events/")) return { title: "Etkinlik detayları", text: "Tarih, yer ve katılım bilgileri." };
  if (pathname === "/admin") return { title: "Etkinlik yönetimi", text: "Kampüs takvimindeki etkinlikleri düzenle." };
  if (pathname === "/admin/new") return { title: "Yeni etkinlik", text: "Takvime yeni bir buluşma ekle." };
  if (pathname.includes("/edit")) return { title: "Etkinliği güncelle", text: "Etkinlik bilgilerini düzenle." };
  if (pathname === "/login") return { title: "Tekrar hoş geldin", text: "Kampüs etkinliklerine giriş yap." };
  if (pathname === "/register") return { title: "Aramıza katıl", text: "Kampüs etkinlikleri için hesabını oluştur." };
  if (pathname === "/forgot-password") return { title: "Şifreni yenile", text: "E-posta adresinle yenileme bağlantısı iste." };
  return { title: "Sayfa bulunamadı", text: "Aradığın adres burada yok." };
}

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].filter((event) => event.date >= TODAY).sort((a, b) => a.date.localeCompare(b.date));
  const featured = upcoming[0];

  return (
    <>
      <section className="home-feature">
        <div className="home-feature-copy">
          <p className="eyebrow">SDÜ · KAMPÜS TAKVİMİ</p>
          <h2>Merak ettiğin şey, bir etkinlikle başlar.</h2>
          <p>Yeni insanlarla tanış, bir fikri dene, kampüsün ritmini yakala.</p>
          <Link className="button-link button-light" to="/events">Etkinlikleri keşfet <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="feature-ticket">
          <span className="ticket-label">SIRADAKİ BULUŞMA</span>
          {featured ? (
            <>
              <p className="ticket-date">{new Date(`${featured.date}T12:00:00`).toLocaleDateString("tr-TR", { day: "2-digit", month: "long" })}</p>
              <h3>{featured.title}</h3>
              <p>{featured.time} <span aria-hidden="true">·</span> {featured.location}</p>
              <Link to={`/events/${featured.id}`} aria-label={`${featured.title} etkinlik detayları`}>Detaylara git <span aria-hidden="true">→</span></Link>
            </>
          ) : (
            <><h3>Takvim biraz sakin.</h3><p>Yeni etkinlikler eklendiğinde burada göreceksin.</p></>
          )}
        </div>
        <span className="feature-index" aria-hidden="true">01 / 04</span>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">YAKLAŞANLAR</p><h2>Takvimine ekle</h2></div>
          <Link className="text-link" to="/events">Tüm etkinlikler <span aria-hidden="true">→</span></Link>
        </div>
        <EventList events={upcoming.slice(0, 3)} emptyText="Yaklaşan etkinlik bulunmuyor." />
      </section>
    </>
  );
}

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <section className="content-section events-section">
      <EventFilter searchText={searchText} category={category} categories={categories} onSearchChange={setSearchText} onCategoryChange={setCategory} />
      <p className="result-count" aria-live="polite">{filtered.length} etkinlik</p>
      <EventList events={filtered} emptyText="Bu ölçütlerle eşleşen etkinlik yok." />
    </section>
  );
}

function EventDetailPage() {
  const { eventId = "" } = useParams();
  const { events } = useEvents();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return <section className="empty-state"><p className="eyebrow">404 · ETKİNLİK YOK</p><h2>Bu etkinliği bulamadık.</h2><Link className="button-link" to="/events">Etkinlik listesine dön</Link></section>;
  }

  return <EventDetail event={event} onBack={() => navigate("/events")} onEdit={() => navigate(`/admin/${event.id}/edit`)} />;
}

function AdminPage() {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();
  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section className="content-section admin-section">
      <div className="section-heading admin-heading">
        <div><p className="eyebrow">KONTROL MASASI</p><h2>Etkinlik listesi</h2></div>
        <Link className="button-link" to="/admin/new"><span aria-hidden="true">＋</span> Etkinlik ekle</Link>
      </div>
      <div className="admin-metrics">
        <div><span>Toplam etkinlik</span><strong>{events.length.toString().padStart(2, "0")}</strong></div>
        <div><span>Kategoriler</span><strong>{new Set(events.map((event) => event.category)).size.toString().padStart(2, "0")}</strong></div>
        <div><span>Yaklaşan</span><strong>{events.filter((event) => event.date >= TODAY).length.toString().padStart(2, "0")}</strong></div>
      </div>
      {sortedEvents.length === 0 ? <p className="empty-state">Henüz etkinlik yok. İlk etkinliği ekleyerek takvimi başlat.</p> : (
        <>
          <div className="table-scroll">
            <table className="admin-table">
              <thead><tr><th>Etkinlik</th><th>Kategori</th><th>Tarih</th><th>Yer</th><th>İşlem</th></tr></thead>
              <tbody>{sortedEvents.map((event) => <tr key={event.id}>
                <td><Link to={`/events/${event.id}`} className="table-event-title">{event.title}</Link><span className="table-time">{event.time}</span></td>
                <td><span className="category-pill">{event.category}</span></td>
                <td>{new Date(`${event.date}T12:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td>{event.location}</td>
                <td className="table-actions"><button className="quiet-button" type="button" onClick={() => navigate(`/admin/${event.id}/edit`)}>Düzenle</button><button className="danger-button" type="button" onClick={() => { if (window.confirm(`“${event.title}” etkinliği silinsin mi?`)) deleteEvent(event.id); }}>Sil</button></td>
              </tr>)}</tbody>
            </table>
          </div>
          <div className="admin-mobile-list">{sortedEvents.map((event) => <AdminEventCard key={event.id} event={event} onEdit={() => navigate(`/admin/${event.id}/edit`)} onDelete={() => { if (window.confirm(`“${event.title}” etkinliği silinsin mi?`)) deleteEvent(event.id); }} />)}</div>
        </>
      )}
    </section>
  );
}

function AdminEventCard({ event, onEdit, onDelete }: { event: CampusEvent; onEdit: () => void; onDelete: () => void }) {
  return <article className="admin-mobile-card"><div><span className="category-pill">{event.category}</span><h3>{event.title}</h3><p>{new Date(`${event.date}T12:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })} · {event.time}</p><p>{event.location}</p></div><div className="table-actions"><button className="quiet-button" type="button" onClick={onEdit}>Düzenle</button><button className="danger-button" type="button" onClick={onDelete}>Sil</button></div></article>;
}

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  return <section className="form-section"><div className="section-heading"><div><p className="eyebrow">YÖNETİM / YENİ</p><h2>Etkinlik bilgileri</h2></div><Link className="text-link" to="/admin">← Listeye dön</Link></div><EventForm onSubmit={(event) => { addEvent(event); navigate("/admin"); }} /></section>;
}

function EditEventPage() {
  const { eventId = "" } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === eventId);

  if (!event) return <section className="empty-state"><p className="eyebrow">ETKİNLİK YOK</p><h2>Düzenlenecek etkinlik bulunamadı.</h2><Link className="button-link" to="/admin">Yönetime dön</Link></section>;
  return <section className="form-section"><div className="section-heading"><div><p className="eyebrow">YÖNETİM / DÜZENLE</p><h2>{event.title}</h2></div><Link className="text-link" to="/admin">← Listeye dön</Link></div><EventForm key={event.id} initialValue={event} onSubmit={(updated) => { updateEvent(event.id, updated); navigate("/admin"); }} /></section>;
}

function AuthPage({ mode }: { mode: "login" | "register" | "forgot" }) {
  const [message, setMessage] = useState("");
  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const submitText = isLogin ? "Giriş yap" : isRegister ? "Hesap oluştur" : "Bağlantı gönder";

  return <section className="auth-layout"><div className="auth-aside"><p className="eyebrow">KAMPÜS ETKİNLİKLERİ</p><h2>Bir sonraki güzel şey, takviminde.</h2><p>Atölye, seminer ve söyleşilerde görüşürüz.</p></div><form className="auth-form" onSubmit={(event) => { event.preventDefault(); setMessage(isLogin ? "Giriş bilgileri alındı." : isRegister ? "Hesabın oluşturuldu." : "Yenileme bağlantısı e-posta adresin için hazırlandı."); }}>
    <div><p className="eyebrow">{isLogin ? "HESABIN" : isRegister ? "YENİ HESAP" : "HESAP DESTEĞİ"}</p><h2>{isLogin ? "Giriş yap" : isRegister ? "Kayıt ol" : "Şifremi unuttum"}</h2></div>
    {isRegister && <label>Ad soyad<input name="name" autoComplete="name" required /></label>}
    <label>E-posta<input type="email" name="email" autoComplete="email" required /></label>
    {mode !== "forgot" && <label>Şifre<input type="password" name="password" autoComplete={isLogin ? "current-password" : "new-password"} minLength={8} required /></label>}
    <button className="button-link" type="submit">{submitText} <span aria-hidden="true">→</span></button>
    {message && <p className="form-success" role="status">{message}</p>}
    <div className="auth-links">{!isLogin && <Link to="/login">Giriş yap</Link>}{!isRegister && <Link to="/register">Kayıt ol</Link>}{mode !== "forgot" && <Link to="/forgot-password">Şifremi unuttum</Link>}</div>
  </form></section>;
}

function NotFoundPage() {
  return <section className="empty-state"><p className="eyebrow">404 · SAYFA BULUNAMADI</p><h2>Bu adres kampüs haritasında yok.</h2><Link className="button-link" to="/">Ana sayfaya dön</Link></section>;
}

function App() {
  return <BrowserRouter><EventProvider><PageLayout /></EventProvider></BrowserRouter>;
}

export default App;
