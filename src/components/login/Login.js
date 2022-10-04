import "../register/Register.css";
import { Link } from "react-router-dom";
import React from "react";

function Login({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    submit(email, password);
  }

  return(
    <section className="register">
      <Link className="register__logo" to="/"></Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__container">
          <label className="register__label">E-mail</label>
          <input
            required
            type="email"
            className="register__input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register__container">
          <label className="register__label">Пароль</label>
          <input
            required
            type="password"
            className="register__input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="register__button register__button_type_big" type="submit">Войти</button>
      </form>
      <p className="register__text">Ещё не зарегистрированы? <Link to="/signup" className="register__link">Регистрация</Link></p>
    </section>
  )
}

export default Login;