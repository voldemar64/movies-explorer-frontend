import "./Register.css";
import { Link } from "react-router-dom";

function Login({ submit }) {
  return(
    <section className="register">
      <Link className="register__logo" to="/"></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={submit}>
        <div className="register__container">
          <label className="register__label">Имя</label>
          <input
            required
            type="text"
            className="register__input"
          />
        </div>
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
        <button className="register__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы? 
        <Link to="/signin" className="register__link">Войти</Link>
      </p>
    </section>
  )
}

export default Login;