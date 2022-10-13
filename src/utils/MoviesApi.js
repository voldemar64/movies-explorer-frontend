class MoviesApi {
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

  getMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._handleRes(res);
      })
  }
}

const moviesApi = new MoviesApi(
  'https://api.nomoreparties.co/beatfilm-movies',
  {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
);

export default moviesApi;