import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h3 className="techs__title techs__title_size_s">Технологии</h3>
      <div className="techs__container">
        <h2 className="techs__title techs__title_size_m">7 технологий</h2>
        <p className="techs__subtitle">На курсе веб-разработки мы 
        освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <div className="techs__list">
        <a href="http://htmlbook.ru/html" rel="noreferrer" target="_blank" className="techs__link">HTML</a>
        <a href="https://doka.guide/css/" rel="noreferrer" target="_blank" className="techs__link">CSS</a>
        <a href="https://learn.javascript.ru/js" rel="noreferrer" target="_blank" className="techs__link">JS</a>
        <a href="https://reactjs.org/" rel="noreferrer" target="_blank" className="techs__link">React</a>
        <a href="https://git-scm.com/" rel="noreferrer" target="_blank" className="techs__link">Git</a>
        <a href="https://expressjs.com/ru/" rel="noreferrer" target="_blank" className="techs__link">Express.js</a>
        <a href="https://www.mongodb.com/" rel="noreferrer" target="_blank" className="techs__link">mongoDB</a>
      </div>
    </section>
  )
}

export default Techs;