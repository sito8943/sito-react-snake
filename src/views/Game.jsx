import { useState, useCallback, useEffect } from "react";
import SitoContainer from "sito-container";

const Game = () => {
  const [fieldSize, setFieldSize] = useState(16);
  const [field, setField] = useState([]);

  const [snake, setSnake] = useState([]);

  const init = useCallback(() => {
    const newField = [];
    for (let i = 0; i < fieldSize; i += 1) newField.push(0);
    setField(newField);
    setSnake([
      { y: fieldSize / 2, x: fieldSize / 2 },
      { y: fieldSize / 2 - 1, x: fieldSize / 2 },
    ]);
  }, [fieldSize]);

  useEffect(() => {
    init();
  }, [fieldSize, init]);

  const cell = {
    width: "30px",
    height: "30px",
    background: "#222333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1px",
  };

  // movement
  const moveDown = () => {
    
  };

  const moveUp = () => {};

  const moveRight = () => {};

  const moveLeft = () => {};

  const isHead = (y, x) => snake[0].y === y && snake[0].x === x;

  const isBody = (y, x) => {
    const body = snake.filter((item, i) => {
      if (item.y === y && item.x === x && i !== 0) return item;
      return null;
    });
    console.log(body);
    if (body.length) return true;
    return false;
  };

  return (
    <div className="App">
      <header className="App-header">
        {field.map((item, i) => (
          <SitoContainer key={i}>
            {field.map((jtem, j) => (
              <SitoContainer key={j} sx={cell}>
                {isHead(i, j) && <div className="snake-head" />}
                {isBody(i, j) && <div className="snake-body" />}
              </SitoContainer>
            ))}
          </SitoContainer>
        ))}
      </header>
    </div>
  );
};

export default Game;
