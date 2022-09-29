import {Route, Switch} from "react-router-dom";
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
import { useWindowWidth } from "../../utils/windowWidth";
import cards from "../../constants/moviesList";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);

  function handleSideBarOpen() {
    setIsSideBarOpen(true)
  }

  function handleSideBarClose() {
    setIsSideBarOpen(false)
  }

  return (
    <>
      <Header onSideBarOpen={handleSideBarOpen} windowWidth={useWindowWidth}/>
      <main className="main">
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
          <Route path="/signup">
            <Register/>
          </Route>
          <Route exact path="/movies">
            <Movies movies={cards}/>
          </Route>
          <Route path="/saved-movies">
            <SavedMovies savedMovies={cards}/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </main>
      <Footer/>
      <SideBar
        isOpen={isSideBarOpen}
        onClose={handleSideBarClose}
      />
    </>
  );
}

export default App;
