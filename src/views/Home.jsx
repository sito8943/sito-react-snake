import { Link } from "react-router-dom";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

// images
import logo from "../logo.svg";

const Home = () => {
  const { languageState } = useLanguage();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{languageState.texts.Home.Title}</h1>
        <Link className="App-link" to="/game">
          {languageState.texts.Home.Start}
        </Link>
      </header>
    </div>
  );
};

export default Home;
