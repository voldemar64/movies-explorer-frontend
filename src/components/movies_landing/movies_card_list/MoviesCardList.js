import MoviesCard from "../movies_card/MoviesCard";
import "./MoviesCardList.css"

function MoviesCardList({movies}) {
  return (
    <ul className="cards">
      {movies.map((card, key) => {
        return (
          <MoviesCard key={key} card={card}/>
        )
      })}
    </ul>
  )
}

export default MoviesCardList;