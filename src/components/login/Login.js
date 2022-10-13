import "../register/Register.css";
import { Link, Redirect } from "react-router-dom";
import {useFormWithValidation} from "../../utils/formValidator";

function Login({ submit, loggedIn }) {
  const {values, handleChange, isValid} = 
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      submit(values.email, values.password);
    }
  }

  return(
    !loggedIn ?
    <section className="register">
      <Link className="register__logo" to="/"></Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__container">
          <label className="register__label">E-mail</label>
          <input
            name="email"
            required
            type="email"
            className="register__input"
            onChange={handleChange}
          />
        </div>
        <div className="register__container">
          <label className="register__label">Пароль</label>
          <input
            name="password"
            required
            type="password"
            className="register__input"
            onChange={handleChange}
          />
        </div>
        <button className={`register__button register__button_type_big${!isValid ? ' register__button_disabled' : ''}`}
          type="submit" disabled={!isValid}>Войти</button>
      </form>
      <p className="register__text">Ещё не зарегистрированы? <Link to="/signup" className="register__link">Регистрация</Link></p>
    </section> :
    <Redirect to="/"/>
  )
}

export default Login;