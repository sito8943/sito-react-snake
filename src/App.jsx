// contexts
import { useLanguage } from "./contexts/LanguageProvider";

// images
import logo from "./logo.svg";

// styles
import "./App.css";

const App = () => {
  const { languageState } = useLanguage();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{languageState.texts.Home.Title}</h1>
        <Link
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {languageState.texts.Home.Start}
        </Link>
      </header>
    </div>
  );
};

export default App;
