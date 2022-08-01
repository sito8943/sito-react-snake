import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

const Control = (props) => {
  const { onLeft, onRight, onUp, onDown } = props;

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
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
      </SitoContainer>
      <SitoContainer>
        <button className="fav-button" onClick={onLeft}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <button className="fav-button small-fab-margin-left" onClick={onRight}>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </SitoContainer>
      <SitoContainer
        justifyContent="center"
        sx={{ width: "100%", marginTop: "5px" }}
      >
        <button className="fav-button" onClick={onDown}>
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
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
