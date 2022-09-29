import "./MoviesCard.css";

function MoviesCard({ card }) {

  return(
    <li className="card">
      <div className="card__container">
        <p className="card__title">
          {card.title}
        </p>
        <p className="card__duration">
          {card.duration}
        </p>
      </div>
      <img className="card__image" src={card.link} alt={card.title}/>
      <button type="button" className="card__like card__like_type_liked"></button>
    </li>
  )
}

export default MoviesCard;