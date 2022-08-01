import { useState } from "react";

import PropTypes from "prop-types";

// sito components
import SitoContainer from "sito-container";

const FabButtons = (props) => {
  const { onPause, onSidebarOpen } = props;

  const [pause, setPause] = useState(false);

  return (
    <SitoContainer
      flexDirection="column"
      sx={{ position: "fixed", zIndex: 30, bottom: 10, right: 10 }}
    >
      <i
        className="fab-button fa fa-cog"
        aria-hidden="true"
        onClick={onSidebarOpen}
      ></i>
      <i
        className={`small-fab-margin-top fab-button fa ${
          pause ? "fa-play-circle" : "fa-pause-circle"
        }`}
        aria-hidden="true"
        onClick={() => {
          setPause(!pause);
          onPause();
        }}
      ></i>
    </SitoContainer>
  );
};

FabButtons.propTypes = {
  onPause: PropTypes.func.isRequired,
  onSidebarOpen: PropTypes.func.isRequired,
};

export default FabButtons;
