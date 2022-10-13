import "./AboutMe.css";
import photoPath from "../../../images/developer_photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__title about-me__title_size_s">Студент</h3>
      <div className="about-me__container">
        <div className="about-me__texts">
          <h3 className="about-me__title about-me__title_size_m">Владимир</h3>
          <h4 className="about-me__title about-me__title_size_xs">Фронтенд-разработчик, 17 лет</h4>
          <p className="about-me__subtitle"> 
            Туп. Жаден. Прожорлив. Ленив. Труслив. Надменен. 
            Характер отсутствует. Не женат. 
            Здесь должно быть больше текста, но мне лень писать.
          </p>
          <a className="about-me__link" href="https://github.com/voldemar64" rel="noreferrer" target="_blank">Github</a>
        </div>
        <img className="about-me__img" src={photoPath} alt="моё фото"></img>
      </div>
    </section>
  )
}

export default AboutMe;