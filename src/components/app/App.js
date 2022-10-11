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
import InfoTooltip from "../infotooltip/InfoTooltip";
import ProtectedRoute from "../protected_route/ProtectedRoute";
import { useWindowWidth } from "../../utils/windowWidth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi  from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import * as auth from "../../utils/auth";
import tick from '../../images/tick.svg';
import cross from '../../images/cross.svg';

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [popupTitle, setPopupTitle] = React.useState('')
  const [popupPhoto, setPopupPhoto] = React.useState('')

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tokenChecked, setTokenChecked] = React.useState(false);

  const [moviesNumber, setMoviesNumber] = React.useState(0);
  const [listLength, setListLength] = React.useState(0);

  const [localSavedMovies, setLocalSavedMovies] = React.useState([]);
  const [localApiMovies, setLocalApiMovies] = React.useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = React.useState([]);
  const [apiFilteredMovies, setApiFilteredMovies] = React.useState([]);

  const history = useHistory();
  const { width } = useWindowWidth();
  const pathName = useLocation();

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
      mainApi.getUserInfo()
        .then(res => {
          if (res) {
            setTokenChecked(true)
            setLoggedIn(true)
            setCurrentUser(res)
          } else {
            setTokenChecked(true)
          }
        })
        .catch(err => {
          setTokenChecked(true)
          console.log(`Не получается токен: ${err}`)
        })
    } else {
      setTokenChecked(true)
    }
  }, [])

  React.useEffect(() => {
    if (loggedIn && !(localStorage.getItem('movies'))) {
      moviesApi.getMovies()
        .then(movies => {
          localStorage.setItem('movies', JSON.stringify(movies));
          const allMovies = JSON.parse(localStorage.getItem('movies'));
          setLocalApiMovies(allMovies);
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
      .then((res) => {
        if (res) {
          setPopupTitle('Вы успешно зарегистрировались!')
          setPopupPhoto(tick)
          handleLogin(email, password)
        } else {
          setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
          setPopupPhoto(cross)
        }
      })
      .catch(() => {
        setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
        setPopupPhoto(cross)
      })
      .finally(setIsInfoTooltipOpen(true))
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(res => {
        if (res) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          history.push('/movies')
        } else {
          setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
          setPopupPhoto(cross)
          setIsInfoTooltipOpen(true)
        }
      })
      .catch(() => {
        setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
        setPopupPhoto(cross)
        setIsInfoTooltipOpen(true)
      })
  }

  function handleSignOut() {
    setTokenChecked(false)
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
        if (res) {
          setCurrentUser(res)
          setPopupTitle('Данные пользователя изменены')
          setPopupPhoto(tick)
          setIsInfoTooltipOpen(true)
        }
      })
      .catch(err => {
        setPopupTitle(`произошла ошибка: ${err}`)
        setPopupPhoto(tick)
        setIsInfoTooltipOpen(true)
      })
  }

  function handleSideBar() {
    setIsSideBarOpen(!isSideBarOpen)
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(false)
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      handleInfoTooltip()
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onSideBarOpen={handleSideBar}
        windowWidth={useWindowWidth}
        isLogged={loggedIn}
      />
      <main className="main">
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/signin">
            <Login
              submit={handleLogin}
              loggedIn={loggedIn}
            />
          </Route>
          <Route path="/signup">
            <Register
              submit={handleRegister}
              loggedIn={loggedIn}
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
              loggedIn={tokenChecked}
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
              loggedIn={tokenChecked}
            />
          </Route>
          <Route path="/profile">
            <ProtectedRoute
              component={Profile}
              onSubmit={handleEditProfile}
              signOut={handleSignOut}
              loggedIn={tokenChecked}
            />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </main>
      <Footer/>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleInfoTooltip}
        onOverlayClick={handleOverlayClick}
        title={popupTitle}
        photo={popupPhoto}
      />

      <SideBar
        isOpen={isSideBarOpen}
        onClose={handleSideBar}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
