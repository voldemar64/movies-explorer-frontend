class MainApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(console.log(`Ошибка: ${res.status}`));
    }
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
    })
      .then(res => {
        return this._handleRes(res);
      })
  }

  patchUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(res => {
        return this._handleRes(res);
      })
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(res => {
        return this._handleRes(res);
      })
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.thumbnail}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    })
      .then(res => {
        return this._handleRes(res);
      })
  }

  deleteMovie(movie){
    return fetch(`${this._baseUrl}/movies/${movie.movieId}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(res => {
        return this._handleRes(res);
      })
  }
}

const mainApi = new MainApi(
  'https://api.movies.vova.nomoredomains.sbs',
  {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
);

export default mainApi;