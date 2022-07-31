import { useState, useCallback, useEffect } from "react";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

const DirectionEnum = {
  Up: 1,
  Right: 2,
  Down: 3,
  Left: 4,
};

const Game = () => {
  const { languageState } = useLanguage();

  const [fieldSize, setFieldSize] = useState(16);
  const [field, setField] = useState([]);

  const [direction, setDirection] = useState(DirectionEnum.Down);
  const [snake, setSnake] = useState([]);

  const init = useCallback(() => {
    const newField = [];
    for (let i = 0; i < fieldSize; i += 1) newField.push(0);
    setField(newField);
    /* setSnake([
      { y: fieldSize / 2, x: fieldSize / 2 },
      { y: fieldSize / 2 - 1, x: fieldSize / 2 },
    ]); */
    setSnake([
      { y: fieldSize / 2, x: fieldSize / 2 },
      { y: fieldSize / 2 - 1, x: fieldSize / 2 },
      { y: fieldSize / 2 - 1, x: fieldSize / 2 + 1 },
      { y: fieldSize / 2 - 1, x: fieldSize / 2 + 2 },
      { y: fieldSize / 2, x: fieldSize / 2 + 2 },
      { y: fieldSize / 2, x: fieldSize / 2 + 3 },
      { y: fieldSize / 2, x: fieldSize / 2 + 4 },
      { y: fieldSize / 2 - 1, x: fieldSize / 2 + 4 },
      { y: fieldSize / 2 - 2, x: fieldSize / 2 + 4 },
      { y: fieldSize / 2 - 3, x: fieldSize / 2 + 4 },
      { y: fieldSize / 2 - 3, x: fieldSize / 2 + 3 },
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
    const cloneSnake = direction === DirectionEnum.Up ? snake.reverse() : snake;
    const newSnake = [];
    let lastXY = {};
    for (let i = 0; i < cloneSnake.length; i += 1) {
      const newItem = { ...cloneSnake[i] };
      if (i !== 0) {
        if (lastXY.y > cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y += 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x < cloneSnake[i].x)
          newItem.x -= 1;
        else if (lastXY.y < cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y -= 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x > cloneSnake[i].x)
          newItem.x += 1;
      } else newItem.y += 1;
      lastXY = { ...cloneSnake[i] };
      newSnake.push(newItem);
    }
    setSnake(newSnake);
    setDirection(DirectionEnum.Down);
  };

  const moveUp = () => {
    const cloneSnake =
      direction === DirectionEnum.Down ? snake.reverse() : snake;
    const newSnake = [];
    let lastXY = {};
    for (let i = 0; i < cloneSnake.length; i += 1) {
      const newItem = { ...cloneSnake[i] };
      if (i !== 0) {
        if (lastXY.y > cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y += 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x < cloneSnake[i].x)
          newItem.x -= 1;
        else if (lastXY.y < cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y -= 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x > cloneSnake[i].x)
          newItem.x += 1;
      } else newItem.y -= 1;
      lastXY = { ...cloneSnake[i] };
      newSnake.push(newItem);
    }
    setSnake(newSnake);
    setDirection(DirectionEnum.Up);
  };

  const moveRight = () => {
    const cloneSnake =
      direction === DirectionEnum.Left ? snake.reverse() : snake;
    const newSnake = [];
    let lastXY = {};
    for (let i = 0; i < cloneSnake.length; i += 1) {
      const newItem = { ...cloneSnake[i] };
      if (i !== 0) {
        if (lastXY.y > cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y += 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x < cloneSnake[i].x)
          newItem.x -= 1;
        else if (lastXY.y < cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y -= 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x > cloneSnake[i].x)
          newItem.x += 1;
      } else newItem.x += 1;
      lastXY = { ...cloneSnake[i] };
      newSnake.push(newItem);
    }
    setSnake(newSnake);
    setDirection(DirectionEnum.Right);
  };

  const moveLeft = () => {
    const cloneSnake =
      direction === DirectionEnum.Right ? snake.reverse() : snake;
    const newSnake = [];
    let lastXY = {};
    for (let i = 0; i < cloneSnake.length; i += 1) {
      const newItem = { ...cloneSnake[i] };
      if (i !== 0) {
        if (lastXY.y > cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y += 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x < cloneSnake[i].x)
          newItem.x -= 1;
        else if (lastXY.y < cloneSnake[i].y && lastXY.x === cloneSnake[i].x)
          newItem.y -= 1;
        else if (lastXY.y === cloneSnake[i].y && lastXY.x > cloneSnake[i].x)
          newItem.x += 1;
      } else newItem.x -= 1;
      lastXY = { ...cloneSnake[i] };
      newSnake.push(newItem);
    }
    setSnake(newSnake);
    setDirection(DirectionEnum.Left);
  };

  const isHead = (y, x) => snake[0].y === y && snake[0].x === x;

  const isBody = (y, x) => {
    const body = snake.filter((item, i) => {
      if (item.y === y && item.x === x && i !== 0) return item;
      return null;
    });
    if (body.length) return true;
    return false;
  };

  const rotateByDirection = () => {
    switch (direction) {
      case DirectionEnum.Up:
        return "face-up";
      case DirectionEnum.Left:
        return "face-left";
      case DirectionEnum.Right:
        return "face-right";
      default:
        return "";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {field.map((item, i) => (
          <SitoContainer key={i}>
            {field.map((jtem, j) => (
              <SitoContainer key={j} sx={cell}>
                {isHead(i, j) && (
                  <div className={`snake-head ${rotateByDirection()}`} />
                )}
                {isBody(i, j) && <div className="snake-body" />}
              </SitoContainer>
            ))}
          </SitoContainer>
        ))}
      </header>
      <SitoContainer sx={{ position: "absolute", zIndex: 99, top: 0, left: 0 }}>
        <button onClick={moveUp}>{languageState.texts.Game.Up}</button>
        <button onClick={moveLeft}>{languageState.texts.Game.Left}</button>
        <button onClick={moveRight}>{languageState.texts.Game.Right}</button>
        <button onClick={moveDown}>{languageState.texts.Game.Down}</button>
      </SitoContainer>
    </div>
  );
};

export default Game;
