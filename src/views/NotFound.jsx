import { Link } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

// images
import logo from "../logo.svg";

const NotFound = () => {
  const { languageState } = useLanguage();

  return (
    <SitoContainer ignoreDefault className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{languageState.texts.NotFound.Title}</h1>
        <p>{languageState.texts.NotFound.Description}</p>
        <Link className="App-link" to="/game">
          {languageState.texts.NotFound.Link}
        </Link>
      </header>
    </SitoContainer>
  );
};

export default NotFound;
