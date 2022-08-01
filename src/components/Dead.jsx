import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

const Dead = (props) => {
  const { visible, onRetry } = props;

  const { languageState } = useLanguage();

  return (
    <SitoContainer
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        transition: "all 500ms ease",
        opacity: visible ? 1 : 0,
        zIndex: visible ? 99 : 0,
        background: "#222333",
        color: "aliceblue",
        fontSize: "35px",
      }}
    >
      <h2 className="no-margin red">{languageState.texts.Dead.Title}</h2>
      <p className="no-margin">{languageState.texts.Dead.Description}</p>
      <button className="button" onClick={onRetry}>
        {languageState.texts.Dead.Retry}
      </button>
    </SitoContainer>
  );
};

Dead.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default Dead;
