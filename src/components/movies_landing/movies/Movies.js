import SearchForm from "../search_form/SearchForm";
import MoviesCardsList from "../movies_card_list/MoviesCardList";

function Movies({ durationFilter, handleSearch, movies, savedMovies, onSave, onDelete, addMovies, listLength }) {
  return (
    <>
      <SearchForm 
        durationFilter={durationFilter}
        handleSearch={handleSearch}
      />
      <MoviesCardsList 
        movies={movies}
        savedMovies={savedMovies}
        onSave={onSave}
        onDelete={onDelete}
        addMovies={addMovies}
        listLength={listLength}
      />
    </>
  )
}

export default Movies;