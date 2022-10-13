import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about" className="about-project">
      <h2 className="about-project__title about about-project__title_size_m">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__text">
          <h2 className="about-project__title about-project__title_size_s">Дипломный проект включал 5 этапов</h2>
          <p className="about-project__subtitle">
            Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.
            Я уложил их в три.
          </p>
        </div>
        <div className="about-project__text">
          <h2 className="about-project__title about-project__title_size_s">На выполнение диплома ушло 5 недель</h2>
          <p className="about-project__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, 
            которые я не соблюдал и чудом успешно защитился.
          </p>
        </div>
      </div>
      <div className="line">
        <div className="line__container line__container_size_s">
          <p className="line__title line__title_size_s">1 неделя</p>
          <p className="line__subtitle">Back-end</p>
        </div>
        <div className="line__container line__container_size_m">
          <p className="line__title line__title_size_m">4 недели</p>
          <p className="line__subtitle">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;