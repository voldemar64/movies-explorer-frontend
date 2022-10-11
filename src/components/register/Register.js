import "./Register.css";
import { Link, Redirect } from "react-router-dom";
import React from "react";

function Login({ submit, loggedIn }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    submit(name, email, password);
  }

  return(
    !loggedIn ?
    <section className="register">
      <Link className="register__logo" to="/"></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__container">
          <label className="register__label">Имя</label>
          <input
            name="name"
            required
            type="text"
            className="register__input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="register__container">
          <label className="register__label">E-mail</label>
          <input
            name="email"
            required
            type="email"
            className="register__input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register__container">
          <label className="register__label">Пароль</label>
          <input
            name="password"
            required
            type="password"
            className="register__input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="register__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы? 
        <Link to="/signin" className="register__link">Войти</Link>
      </p>
    </section> :
    <Redirect to="/"/>
  )
}

export default Login;