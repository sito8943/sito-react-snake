import { useState, useCallback, useEffect } from "react";

// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../contexts/LanguageProvider";

// enums
import {
  DirectionEnum,
  jsMoveDown,
  jsMoveUp,
  jsMoveRight,
  jsMoveLeft,
} from "../utils/move";

const Game = () => {
  const { languageState } = useLanguage();

  const [fieldSize, setFieldSize] = useState(16);
  const [canTurnBack, setCanTurnBack] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(snake.length);
      if (snake.length)
        switch (direction) {
          case DirectionEnum.Up:
            return moveUp();
          case DirectionEnum.Right:
            return moveRight();
          case DirectionEnum.Left:
            return moveLeft();
          default:
            return moveDown();
        }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [snake, direction]);

  const keyHandlers = useCallback(
    (e) => {
      console.log(e.key);
      if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a")
        setDirection(DirectionEnum.Left);
      else if (e.key === "ArrowUp" || e.key === "W" || e.key === "w")
        setDirection(DirectionEnum.Up);
      else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d")
        setDirection(DirectionEnum.Right);
      else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s")
        setDirection(DirectionEnum.Down);
    },
    [setDirection]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyHandlers);
    return () => {
      window.removeEventListener("keydown", keyHandlers);
    };
  }, [keyHandlers]);

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
    if (
      (canTurnBack && direction === DirectionEnum.Up) ||
      direction !== DirectionEnum.Up
    ) {
      const newSnake = jsMoveDown(snake, direction);
      setSnake(newSnake);
      setDirection(DirectionEnum.Down);
    }
  };

  const moveUp = () => {
    if (
      (canTurnBack && direction === DirectionEnum.Down) ||
      direction !== DirectionEnum.Down
    ) {
      const newSnake = jsMoveUp(snake, direction);
      setSnake(newSnake);
      setDirection(DirectionEnum.Up);
    }
  };

  const moveRight = () => {
    if (
      (canTurnBack && direction === DirectionEnum.Left) ||
      direction !== DirectionEnum.Left
    ) {
      const newSnake = jsMoveRight(snake, direction);
      setSnake(newSnake);
      setDirection(DirectionEnum.Right);
    }
  };

  const moveLeft = () => {
    if (
      (canTurnBack && direction === DirectionEnum.Right) ||
      direction !== DirectionEnum.Right
    ) {
      const newSnake = jsMoveLeft(snake, direction);
      setSnake(newSnake);
      setDirection(DirectionEnum.Left);
    }
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
        {snake.length &&
          field.map((item, i) => (
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
