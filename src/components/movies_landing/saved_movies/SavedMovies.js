import SearchForm from "../search_form/SearchForm";
import MoviesCardsList from "../movies_card_list/MoviesCardList";

function Movies({ durationFilter, handleSearch, savedMovies, onDelete, addMovies, listLength }) {
  return (
    <>
      <SearchForm 
        durationFilter={durationFilter} 
        handleSearch={handleSearch}
      />
      <MoviesCardsList 
        movies={savedMovies}
        savedMovies={savedMovies}
        onDelete={onDelete}
        addMovies={addMovies}
        listLength={listLength}
      />
    </>
  )
}

export default Movies;