import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

const Loading = (props) => {
  const { visible } = props;

  return (
    <SitoContainer
      justifyContent="center"
      alignItems="center"
      sx={{
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
      <i className="fa fa-refresh rotate" aria-hidden="true"></i>
    </SitoContainer>
  );
};

Loading.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Loading;
