import NavTab from "../nav_tab/NavTab";
import AboutProject from "../about_project/AboutProject";
import Techs from "../techs/Techs";
import AboutMe from "../about_me/AboutMe";
import Porfolio from "../portfolio/Portfolio";

function Main() {
  return (
    <section className="main">
      <NavTab/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Porfolio/>
    </section>
  )
}

export default Main;