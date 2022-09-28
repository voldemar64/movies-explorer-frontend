import SearchForm from "../search_form/SearchForm";
import MoviesCardsList from "../movies_card_list/MoviesCardList";

function Movies(props) {
  return (
    <>
      <SearchForm/>
      <MoviesCardsList movies={props.movies}/>
    </>
  )
}

export default Movies;