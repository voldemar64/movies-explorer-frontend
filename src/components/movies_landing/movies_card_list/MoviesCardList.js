import MoviesCard from "../movies_card/MoviesCard";
import "./MoviesCardList.css"

function MoviesCardList({movies}) {
  return (
    <section className="cards">
      {movies.map((card, key) => {
        return (
          <MoviesCard key={key} card={card}/>
        )
      })}
    </section>
  )
}

export default MoviesCardList;