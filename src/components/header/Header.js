import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import profilePath from "../../images/profile.svg";

function Header({ onSideBarOpen, isLogged, windowWidth }) {
  const pathName = useLocation();
  const { width } = windowWidth();
  
  return (
    (pathName.pathname === "/" ||
      pathName.pathname === "/movies" ||
      pathName.pathname === "/saved-movies" ||
      pathName.pathname === "/profile") &&
      <header className={`header${pathName.pathname === "/" ? "" : " header_type_dark"}`}>
        <div className="header__container">
          <Link to="/" className="header__logo"></Link>
          {isLogged &&
            width>=1280 &&
            <nav className="header__nav">
              <Link to="/movies" className="header__link">Фильмы</Link>
              <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
            </nav>
          }
        </div>
          {isLogged ?
            (width>=1280 ?
            <Link to="/profile" className="header__link header__link_type_profile">
              <p className="header__subtitle">Аккаунт</p>
              <img src={profilePath} alt="профиль" className="header__img"></img>
            </Link> :
            <button type="button" className="header__button" onClick={onSideBarOpen}></button>
            ) :
            <nav className="header__account">
              <Link to="/signup" className="header__link">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_type_signin">Войти</Link>
            </nav>
          }
      </header>
    )
}

export default Header;