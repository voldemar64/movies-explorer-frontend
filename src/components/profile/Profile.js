import "./Profile.css"
import {Link} from "react-router-dom";

function Profile(props) {
  return(
    <section className="profile">
      <form className="profile__form">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__input-container">
          <label className="profile__label">Имя</label>
          <input className="profile__input" type="text" value="Имя"/>
        </div>
        <div className="profile__input-container">
          <label className="profile__label">E-mail</label>
          <input className="profile__input" type="text" value="email"/>
        </div>
        <button className="profile__submit" type="submit">Редактировать</button>
      </form>
      <Link className="profile__signout" to="/signin">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;