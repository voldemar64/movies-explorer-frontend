import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ key, card, savedMovies, onSave, onDelete}) {
  const pathName = useLocation();

  return(
    <li className="card" key={key}>
      <div className="card__container">
        <p className="card__title">
          {card.nameRU}
        </p>
        <p className="card__duration">
          {card.duration}
        </p>
      </div>
      <a className="card__link" rel="noreferrer" target="_blank"
        href={card.trailerLink}>
        <img className="card__image" alt={card.nameRU}
          src={pathName.pathname === "/movies" ? `https://api.nomoreparties.co${card.image.url}` : card.image}/>
      </a>
      {pathName.pathname === '/movies' ?
        <button type="button" onClick={() => {
            onSave(card)
          }}
        className={`card__like${savedMovies.some((m) => m.movieId === card.id) ? '' : ' card__like_type_liked'}`}></button>
        :
        <button type="button" onClick={() => {
            onDelete(card)
          }}
        className={`card__like${savedMovies.some((m) => m.movieId === card.id) ? '' : ' card__like_type_delete'}`}></button>
      }
    </li>
  )
}

export default MoviesCard;