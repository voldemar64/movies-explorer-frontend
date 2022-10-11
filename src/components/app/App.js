import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import React from "react";


import Header from "../header/Header";
import Main from "../main_landing/main/Main";
import Login from "../login/Login";
import Register from "../register/Register";
import Movies from "../movies_landing/movies/Movies";
import SavedMovies from "../movies_landing/saved_movies/SavedMovies";
import Profile from "../profile/Profile";
import NotFound from "../not_found/NotFound";
import Footer from "../footer/Footer";
import SideBar from "../sidebar/SideBar";
import ProtectedRoute from "../protected_route/ProtectedRoute";
import { useWindowWidth } from "../../utils/windowWidth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi  from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import * as auth from "../../utils/auth";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [moviesNumber, setMoviesNumber] = React.useState(0);
  const [listLength, setListLength] = React.useState(0);

  const [localSavedMovies, setLocalSavedMovies] = React.useState([]);
  const [localApiMovies, setLocalApiMovies] = React.useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = React.useState([]);
  const [apiFilteredMovies, setApiFilteredMovies] = React.useState([]);

  const history = useHistory();
  const { width } = useWindowWidth();
  const pathName = useLocation();
  const jwt = localStorage.getItem("jwt");

  React.useEffect(() => {
    if (pathName.pathname === '/movies') {
      setApiFilteredMovies([])
    }
  }, [pathName.pathname])

  React.useEffect(() => {
    if (pathName.pathname === '/saved-movies') {
      setSavedFilteredMovies(localSavedMovies)
    }
  }, [pathName.pathname, localSavedMovies])

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token){
      auth.checkToken(token)
        .then(res => {
          if (res) {
            setLoggedIn(true)
          }
        })
        .catch(err => console.log(`Не получается токен: ${err}`))
    }
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData.user)
      })
      .catch(err => console.log(`Ошибка при изначальной отрисовке данных: ${err}`));
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      moviesApi.getMovies()
        .then(movies => {
          localStorage.setItem('movies', JSON.stringify(movies));
          const allMovies = JSON.parse(localStorage.getItem('movies'));
          setLocalApiMovies(allMovies); //ВОЗМОЖНО НЕПРАВИЛЬНО
        })
        .catch(err => console.log(`Ошибка при получении фильмов: ${err}`))
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then(movies => {
          localStorage.setItem('savedMovies', JSON.stringify(movies.filter((e) => e.owner === currentUser._id)));
          localStorage.setItem('savedFilteredMovies', JSON.stringify(movies.filter((e) => e.owner === currentUser._id)));
          const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
          setLocalSavedMovies(userMovies);
          setSavedFilteredMovies(userMovies);
        })
        .catch(err => console.log(`Ошибка при получении сохранённых фильмов: ${err}`))
    }
  }, [loggedIn, currentUser])

  React.useEffect(() => {
    if (width >= 1280) {
      setMoviesNumber(3);
      setListLength(12);
    } else if (width >= 768 && width <= 1279) {
      setMoviesNumber(2);
      setListLength(8);
    } else if (width <= 320 && width <= 480) {
      setMoviesNumber(2);
      setListLength(5);
    }
  }, [width])


  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then(() => {
        handleLogin(email, password)
      })
      .catch(() => console.log('Что-то пошло не так! Попробуйте ещё раз.'))
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        history.push('/movies')
      })
      .catch(() => console.log('Что-то пошло не так! Попробуйте ещё раз.'))
  }

  function handleSignOut() {
    setLoggedIn(false)
    setCurrentUser(null)
    setSavedFilteredMovies([])
    setApiFilteredMovies([])
    setLocalSavedMovies([])
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('filteredMovies')
    localStorage.removeItem('savedFilteredMovies')
    localStorage.removeItem('jwt')
    history.push('/')
  }

  function handleSearch(input) {
    const filteredSearch = localApiMovies.filter((i) => {
      const inputs = input.toLowerCase();
      const nameEN = i.nameEN.toLowerCase();
      const nameRU = i.nameRU.toLowerCase();

      return ((nameEN.includes(inputs) || nameRU.includes(inputs)) ? i : null)
    })

    localStorage.setItem('filteredMovies', JSON.stringify(filteredSearch))
    setApiFilteredMovies(filteredSearch)
  }

  function handleSearchSaved(input) {
    const filteredSearch = localSavedMovies.filter((i) => {
      const inputs = input.toLowerCase();
      const nameEN = i.nameEN.toLowerCase();
      const nameRU = i.nameRU.toLowerCase();

      return ((nameEN.includes(inputs) || nameRU.includes(inputs)) ? i : null)
    })

    localStorage.setItem('savedFilteredMovies', JSON.stringify(filteredSearch))
    const filteredMovies = JSON.parse(localStorage.getItem('savedFilteredMovies'))
    setSavedFilteredMovies(filteredMovies.length !== 0 ? filteredMovies : localSavedMovies)
  }

  function durationFilter(toggle) {
    const filteredFilms = JSON.parse(localStorage.getItem('filteredMovies'))
    
    if (toggle && filteredFilms) {
      const shorts = filteredFilms.filter((i) => i.duration <= 40)
      setApiFilteredMovies(shorts)
    } else {
      setApiFilteredMovies(filteredFilms)
    }
  }

  function savedDurationFilter(toggle) {
    const savedFilteredFilms = JSON.parse(localStorage.getItem('savedFilteredMovies'))

    if (toggle && savedFilteredFilms) {
      const shorts = savedFilteredFilms.filter((i) => i.duration <= 40)
      setSavedFilteredMovies(shorts)
    } else {
      setSavedFilteredMovies(savedFilteredFilms)
    }
  }

  function handleLikeMovie(movie) {
    const liked = localSavedMovies.some((i) => movie.id === i.movieId);

    if (!liked) {
      mainApi.saveMovie(movie)
        .then((res) => {
          localStorage.setItem('savedMovies', JSON.stringify([...localSavedMovies, res]))
          const movies = JSON.parse(localStorage.getItem('savedMovies'))
          setLocalSavedMovies(movies)
        })
    } else {
      const cardToDelete = localSavedMovies.find((i) => i.movieId === movie.id)
      handleDislikeMovie(cardToDelete)
    }
  }

  function handleDislikeMovie(movie) {
    mainApi.deleteMovie(movie)
      .then((item) => {
        localStorage.setItem('savedMovies', JSON.stringify(localSavedMovies.filter((i) => i.movieId !== item.movieId)))
        localStorage.setItem('savedFilteredMovies', JSON.stringify(savedFilteredMovies.filter((i) => i.movieId !== item.movieId)))
        const movies = JSON.parse(localStorage.getItem('savedMovies'));
        const filteredMovies = JSON.parse(localStorage.getItem('savedFilteredMovies'));
        setSavedFilteredMovies(filteredMovies)
        setLocalSavedMovies(movies)
      })
  }

  function addMovies() {
    setListLength(listLength + moviesNumber)
  }

  function handleEditProfile(user) {
    mainApi.patchUserInfo(user)
      .then(res => {
        setCurrentUser(res)
        alert('Данные профиля изменены.')
      })
      .catch(err => alert(`Произошла ошибка: ${err}`))
  }

  function handleSideBar() {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onSideBarOpen={handleSideBar}
        windowWidth={useWindowWidth}
        isLogged={jwt}
      />
      <main className="main">
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/signin">
            <Login
              submit={handleLogin}
            />
          </Route>
          <Route path="/signup">
            <Register
              submit={handleRegister}
            />
          </Route>
          <Route exact path="/movies">
            <ProtectedRoute
              component={Movies}
              durationFilter={durationFilter}
              handleSearch={handleSearch}
              movies={apiFilteredMovies}
              savedMovies={localSavedMovies}
              onSave={handleLikeMovie}
              onDelete={handleDislikeMovie}
              addMovies={addMovies}
              listLength={listLength}
              loggedIn={jwt}
            />
          </Route>
          <Route path="/saved-movies">
            <ProtectedRoute
              component={SavedMovies}
              durationFilter={savedDurationFilter}
              handleSearch={handleSearchSaved}
              movies={savedFilteredMovies}
              savedMovies={localSavedMovies}
              onDelete={handleDislikeMovie}
              addMovies={addMovies}
              listLength={listLength}
              loggedIn={jwt}
            />
          </Route>
          <Route path="/profile">
            <ProtectedRoute
              component={Profile}
              onSubmit={handleEditProfile}
              signOut={handleSignOut}
              loggedIn={jwt}
            />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </main>
      <Footer/>
      <SideBar
        isOpen={isSideBarOpen}
        onClose={handleSideBar}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
