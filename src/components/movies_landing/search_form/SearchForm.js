import "./SearchForm.css"
import React from "react";

function SearchForm({ durationFilter, handleSearch }) {


  const [isActive, setIsActive] = React.useState(true);
  const [value, setValue] = React.useState('');

  function handleSubmitForm(e) {
    e.preventDefault();
    handleSearch(value);
  }

  function toggleButtonState() {
    setIsActive(!isActive);
    durationFilter(isActive)
  }

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={(e) => handleSubmitForm(e)}>
        <input className="search-form__input"
          required placeholder="Фильм" value={value}
          onChange={(e) => setValue(e.target.value)}
        />
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
