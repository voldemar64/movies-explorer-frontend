import "../register/Register.css";
import { Link } from "react-router-dom";

function Login({ submit }) {
  return(
    <section className="register">
      <Link className="register__logo" to="/"></Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__form" onSubmit={submit}>
        <div className="register__container">
          <label className="register__label">E-mail</label>
          <input
            required
            type="email"
            className="register__input"
          />
        </div>
        <div className="register__container">
          <label className="register__label">Пароль</label>
          <input
            required
            type="password"
            className="register__input"
          />
        </div>
        <button className="register__button register__button_type_big" type="submit">Войти</button>
      </form>
      <p className="register__text">Ещё не зарегистрированы? <Link to="/signup" className="register__link">Регистрация</Link></p>
    </section>
  )
}

export default Login;