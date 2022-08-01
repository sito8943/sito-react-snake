import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

const Control = (props) => {
  const { onLeft, onRight, onUp, onDown } = props;

  const { languageState } = useLanguage();

  return (
    <SitoContainer
      flexDirection="column"
      sx={{ position: "absolute", zIndex: 99, bottom: 10, left: 10 }}
    >
      <SitoContainer
        justifyContent="center"
        sx={{ width: "100%", marginBottom: "5px" }}
      >
        <button className="fav-button" onClick={onUp}>
          {languageState.texts.Game.Up}
        </button>
      </SitoContainer>
      <SitoContainer>
        <button className="fav-button" onClick={onLeft}>
          {languageState.texts.Game.Left}
        </button>
        <button className="fav-button small-fab-margin-left" onClick={onRight}>
          {languageState.texts.Game.Right}
        </button>
      </SitoContainer>
      <SitoContainer
        justifyContent="center"
        sx={{ width: "100%", marginTop: "5px" }}
      >
        <button className="fav-button" onClick={onDown}>
          {languageState.texts.Game.Down}
        </button>
      </SitoContainer>
    </SitoContainer>
  );
};

Control.propTypes = {
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onLeft: PropTypes.func.isRequired,
  onRight: PropTypes.func.isRequired,
};

export default Control;
