/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";

// sito components
import SitoContainer from "sito-container";

// own components
import Control from "../components/Control";
import FavButton from "../components/FavButton";
import Loading from "../components/Loading";
import Dead from "../components/Dead";

// enums
import {
  DirectionEnum,
  jsMoveDown,
  jsMoveUp,
  jsMoveRight,
  jsMoveLeft,
} from "../utils/move";

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [fieldSize, setFieldSize] = useState(16);
  const [canTurnBack, setCanTurnBack] = useState(false);
  const [canMoveThroughEdge, setCanMoveThroughEdge] = useState(false);
  const [fruitIncrease, setFruitIncrease] = useState(1);
  const [field, setField] = useState([]);
  const [canMove, setCanMove] = useState(false);

  const [sidebar, setSidebar] = useState(false);

  const [direction, setDirection] = useState(DirectionEnum.Down);
  const [snake, setSnake] = useState([]);
  const [fruit, setFruit] = useState({ y: 3, x: 3 });

  const generateFruit = () => {
    const reducedFieldSize = fieldSize - 3;
    let randomX = Math.floor(Math.random() * reducedFieldSize);
    let randomY = Math.floor(Math.random() * reducedFieldSize);
    if (randomX < 3) randomX += 3;
    if (randomY < 3) randomY += 3;
    let i = 0;
    while (isBody(randomY, randomX) && i < 100) {
      randomX = Math.floor(Math.random() * reducedFieldSize);
      randomY = Math.floor(Math.random() * reducedFieldSize);
      i += 1;
    }
    setFruit({ y: randomY, x: randomX });
  };

  const increaseSnake = () => {
    const newHeads = [];
    for (let i = 0; i < fruitIncrease; i += 1) {
      const newHead = {};
      switch (direction) {
        case DirectionEnum.Up:
          newHead.y = snake[0].y - (i + 1);
          newHead.x = snake[0].x;
          break;
        case DirectionEnum.Left:
          newHead.y = snake[0].y;
          newHead.x = snake[0].x - (i + 1);
          break;
        case DirectionEnum.Right:
          newHead.y = snake[0].y;
          newHead.x = snake[0].x + (i + 1);
          break;
        default:
          newHead.y = snake[0].y + (i + 1);
          newHead.x = snake[0].x;
          break;
      }
      newHeads.push(newHead);
    }
    setSnake([...newHeads, ...snake]);
  };

  const init = useCallback(() => {
    setLoading(true);
    const newField = [];
    setCanMove(true);
    for (let i = 0; i < fieldSize; i += 1) newField.push(0);
    setField(newField);
    setSnake([
      { y: fieldSize / 2, x: fieldSize / 2 },
      { y: fieldSize / 2 - 1, x: fieldSize / 2 },
    ]);
    /* setSnake([
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
    ]); */
    generateFruit();
    setLoading(false);
  }, [fieldSize]);

  useEffect(() => {
    init();
  }, [fieldSize, init]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (canMove)
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
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [canMove, snake, direction]);

  useEffect(() => {
    if (snake.length && isHeadOnFruit()) {
      increaseSnake();
      generateFruit();
    } else if (snake.length && isHeadOnBody()) setCanMove(false);
    else if (snake.length && isHeadOnEdge() && !canMoveThroughEdge)
      setCanMove(false);
  }, [snake]);

  const keyHandlers = useCallback(
    (e) => {
      if (canMove) {
        if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
          if (
            (canTurnBack && direction === DirectionEnum.Right) ||
            direction !== DirectionEnum.Right
          )
            setDirection(DirectionEnum.Left);
        } else if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
          if (
            (canTurnBack && direction === DirectionEnum.Down) ||
            direction !== DirectionEnum.Down
          )
            setDirection(DirectionEnum.Up);
        } else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
          if (
            (canTurnBack && direction === DirectionEnum.Left) ||
            direction !== DirectionEnum.Left
          )
            setDirection(DirectionEnum.Right);
        } else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
          if (
            (canTurnBack && direction === DirectionEnum.Up) ||
            direction !== DirectionEnum.Up
          )
            setDirection(DirectionEnum.Down);
        }
      }
    },
    [canMove, canTurnBack, direction, setDirection]
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

  const isHeadOnFruit = () => fruit.y === snake[0].y && fruit.x === snake[0].x;

  const isHeadOnBody = () => isBody(snake[0].y, snake[0].x);

  const isHeadOnEdge = () =>
    snake[0].y < 0 ||
    snake[0].y === fieldSize ||
    snake[0].x < 0 ||
    snake[0].x === fieldSize;

  const isFruit = (y, x) => fruit.y === y && fruit.x === x;

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
      <Loading visible={loading} />
      <Dead visible={!canMove} onRetry={() => init()} />
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
                  {isFruit(i, j) && <div className="fruit" />}
                </SitoContainer>
              ))}
            </SitoContainer>
          ))}
      </header>
      <Control
        onLeft={() => keyHandlers({ key: "A" })}
        onRight={() => keyHandlers({ key: "D" })}
        onUp={() => keyHandlers({ key: "W" })}
        onDown={() => keyHandlers({ key: "S" })}
      />
      <FavButton onClick={() => setSidebar(true)} />
    </div>
  );
};

export default Game;
