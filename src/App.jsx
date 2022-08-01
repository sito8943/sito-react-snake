// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// views
import Home from "./views/Home";
import Game from "./views/Game";
import NotFound from "./views/NotFound";

// styles
import "./App.css";

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/game" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
