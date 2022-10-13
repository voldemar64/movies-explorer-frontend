import MoviesCard from "../movies_card/MoviesCard";
import Preloader from "../preloader/Preloader";
import "./MoviesCardList.css";

function MoviesCardList({movies, savedMovies, onSave, onDelete, addMovies, listLength, searchDone}) {

  return (
    <section className="movies">
      {movies.length!==0 ?
      <ul className="cards">
        {movies.map((card) => {
          return (
            <MoviesCard card={card} savedMovies={savedMovies}
              onSave={onSave} onDelete={onDelete}
            />
          )
        }).slice(0, listLength)
        }
      </ul>
      : <></>
      }
      {movies.length === 0 ? (searchDone ? <p className="text">По Вашему запросу ничего не найдено</p> 
      : <p className="text">Введите название фильма в поисковой строке</p>) : 
        (movies.length > listLength) &&
        <Preloader addMovies={addMovies}/>}
    </section>
    
  )
}

export default MoviesCardList;