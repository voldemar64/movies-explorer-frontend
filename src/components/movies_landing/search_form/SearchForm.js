import "./SearchForm.css"
import React from "react";

function SearchForm() {
  const [isActive, setIsActive] = React.useState(false);

  function toggleButtonState() {
    setIsActive(!isActive);
  }

  return (
    <section className="search-form">
      <form className="search-form__container">
        <input className="search-form__input" required placeholder="Фильм"/>
        <button className="search-form__button"/>
      </form>
      <div className="search-form__toggle">
        <input type="checkbox" className={`search-form__checkbox${isActive ? " search-form__checkbox_on" : ""}`} 
        onClick={toggleButtonState}/>
        <label className="search-form__text">Короткометражки</label>
      </div>
    </section>
  )
}

export default SearchForm;