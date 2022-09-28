import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__links">
        <a className="portfolio__link" href="https://voldemar64.github.io/how-to-learn/" 
        rel="noreferrer" target="_blank">Статичный сайт</a>
        <a className="portfolio__link" href="https://voldemar64.github.io/russian-travel/" 
        rel="noreferrer" target="_blank">Адаптивный сайт</a>
        <a className="portfolio__link" href="https://mesto.vova.nomoredomains.xyz/" 
        rel="noreferrer" target="_blank">Одностраничное приложение</a>
      </div>
    </div>
  )
}

export default Portfolio;