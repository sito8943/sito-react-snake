import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

const Control = (props) => {
  const { onLeft, onRight, onUp, onDown } = props;

  return (
    <SitoContainer
      flexDirection="column"
      sx={{ position: "absolute", zIndex: 30, bottom: 10, left: 10 }}
    >
      <SitoContainer
        justifyContent="center"
        sx={{ width: "100%", marginBottom: "5px" }}
      >
        <i
          onClick={onUp}
          className="control fab-button fa fa-arrow-up"
          aria-hidden="true"
        ></i>
      </SitoContainer>
      <SitoContainer>
        <i
          onClick={onLeft}
          className="control fab-button fa fa-arrow-left"
          aria-hidden="true"
        ></i>
        <i
          onClick={onRight}
          className="control fab-button medium-fab-margin-left fa fa-arrow-right"
          aria-hidden="true"
        ></i>
      </SitoContainer>
      <SitoContainer
        justifyContent="center"
        sx={{ width: "100%", marginTop: "5px" }}
      >
        <i
          onClick={onDown}
          className="control fab-button fa fa-arrow-down"
          aria-hidden="true"
        ></i>
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
