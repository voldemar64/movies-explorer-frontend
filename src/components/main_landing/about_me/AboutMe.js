import "./AboutMe.css";
import photoPath from "../../../images/developer_pic.png";

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__title about-me__title_size_s">Студент</h3>
      <div className="about-me__container">
        <div className="about-me__texts">
          <h3 className="about-me__title about-me__title_size_m">Владимир</h3>
          <h4 className="about-me__title about-me__title_size_xs">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__subtitle">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about-me__link" href="https://github.com/voldemar64" rel="noreferrer" target="_blank">Github</a>
        </div>
        <img className="about-me__img" src={photoPath} alt="моё фото"></img>
      </div>
    </section>
  )
}

export default AboutMe;