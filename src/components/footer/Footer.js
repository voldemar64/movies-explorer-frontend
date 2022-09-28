import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const pathName = useLocation();

  return (pathName.pathname === "/" ||
    pathName.pathname === "/movies" ||
    pathName.pathname === "/saved-movies" ||
    pathName.pathname === "/profile" ?
      <footer className="footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__nav">
          <p className="footer__date">© 2020</p>
          <div className="footer__links">
            <a className="footer__link" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
            <a className="footer__link" href="https://github.com/">Github</a>
          </div>
        </div>
      </footer>
      : <></>
  )
}

export default Footer;