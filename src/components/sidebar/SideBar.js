import "./SideBar.css";
import { Link } from "react-router-dom";
import profilePath from "../../images/profile.svg";

function SideBar(props) {
  return(
    <section className={`side-bar${props.isOpen ? " side-bar_visible" : ""}`}>
      <button type="button" className="side-bar__close" onClick={props.onClose}/>
      <div className="side-bar__container">
        <Link className="side-bar__button" to="/" onClick={props.onClose}>Главная</Link>
        <Link className="side-bar__button" to="/movies" onClick={props.onClose}>Фильмы</Link>
        <Link className="side-bar__button" to="/saved-movies" onClick={props.onClose}>Сохранённые фильмы</Link>
      </div>
      <Link className="side-bar__button side-bar__button_profile" to='/profile' onClick={props.onClose}>
        <p className="side-bar__account">Аккаунт</p>
        <img className="side-bar__img" src={profilePath} alt="профиль"></img>
      </Link>
    </section>
  )
}

export default SideBar;