import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <div className="topline">
        <Link className="brand" to="/" aria-label="Kampüs Etkinlikleri ana sayfa">
          <span className="brand-mark" aria-hidden="true">K</span>
          <span>Kampüs <strong>Etkinlikleri</strong></span>
        </Link>
        <span className="student-credit">Eyüp Başelçin <i>·</i> 2416501043</span>
      </div>
      <div className="site-heading">
        <p className="eyebrow">SÜLEYMAN DEMİREL ÜNİVERSİTESİ <span>／</span> KAMPÜS YAŞAMI</p>
        <h1>{title}</h1>
        {text && <p className="site-description">{text}</p>}
      </div>
    </header>
  );
}

export default Header;
