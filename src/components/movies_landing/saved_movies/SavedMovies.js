import React from "react";
import SearchForm from "../search_form/SearchForm";
import MoviesCardsList from "../movies_card_list/MoviesCardList";

function Movies({ movies, durationFilter, handleSearch, savedMovies, onDelete, addMovies, listLength }) {

  const [searchDone, setSearchDone] = React.useState(false);

  return (
    <>
      <SearchForm 
        durationFilter={durationFilter} 
        handleSearch={handleSearch}
        setSearchDone={setSearchDone}
      />
      <MoviesCardsList 
        movies={movies}
        savedMovies={savedMovies}
        onDelete={onDelete}
        addMovies={addMovies}
        listLength={listLength}
        searchDone={searchDone}
      />
    </>
  )
}

export default Movies;