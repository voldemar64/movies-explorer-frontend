import MoviesCard from "../movies_card/MoviesCard";
import Preloader from "../preloader/Preloader";
import "./MoviesCardList.css"

function MoviesCardList({movies, savedMovies, onSave, onDelete, addMovies, listLength}) {

  return (
    <section className="movies">
      <ul className="cards">
        {movies.map((card, key) => {
          return (
            <MoviesCard key={key} card={card} savedMovies={savedMovies}
              onSave={onSave} onDelete={onDelete}
            />
          )
        }).slice(0, listLength)
        }
      </ul>

      {movies.length === 0 ? <p className="text">Введите название фильма в поисковой строке</p> : 
        (movies.length > listLength) &&
        <Preloader addMovies={addMovies}/>}
    </section>
    
  )
}

export default MoviesCardList;