import "./SearchForm.css"
import React from "react";

function SearchForm() {
  const [isActive, setIsActive] = React.useState(false);

  function toggleButtonState() {
    setIsActive(!isActive);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <input className="search-form__input" placeholder="Фильм"/>
        <button className="search-form__button"/>
      </div>
      <div className="search-form__toggle">
        <button className={`search-form__checkbox${isActive ? " search-form__checkbox_on" : ""}`} onClick={toggleButtonState}/>
        <p className="search-form__text">Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm;