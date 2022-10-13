import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const pathName = useLocation();
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (pathName.pathname === "/" ||
    pathName.pathname === "/movies" ||
    pathName.pathname === "/saved-movies" ||
    pathName.pathname === "/profile" ?
      <footer className="footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__nav">
          <p className="footer__date">&copy; {year}</p>
          <div className="footer__links">
            <a className="footer__link" rel="noreferrer" target="_blank" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
            <a className="footer__link" rel="noreferrer" target="_blank" href="https://github.com/">Github</a>
          </div>
        </div>
      </footer>
      : <></>
  )
}

export default Footer;