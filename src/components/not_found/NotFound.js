import "./NotFound.css";
import { Link, useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  function goBack() {
    history.goBack()
  }

  return(
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link className="not-found__link" to="#" onClick={goBack}>Назад</Link>
    </section>
  )
}

export default NotFound;