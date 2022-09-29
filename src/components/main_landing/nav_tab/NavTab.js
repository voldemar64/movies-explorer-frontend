import webPath from "../../../images/web.svg";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab">
      <div className="navtab__container">
        <div className="navtab__text">
          <h3 className="navtab__title">Учебный проект студента факультета Веб-разработки.</h3>
          <p className="navtab__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img className="navtab__img" src={webPath} alt="web"></img>
      </div>
      <a href="#about" className="navtab__link">Узнать больше</a>
    </section>
  )
}

export default NavTab;