export const DirectionEnum = {
  Up: 1,
  Right: 2,
  Down: 3,
  Left: 4,
};

export const jsMoveDown = (snake, direction) => {
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
  return newSnake;
};

export const jsMoveUp = (snake, direction) => {
  const cloneSnake = direction === DirectionEnum.Down ? snake.reverse() : snake;
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
  return newSnake;
};

export const jsMoveRight = (snake, direction) => {
  const cloneSnake = direction === DirectionEnum.Left ? snake.reverse() : snake;
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
  return newSnake;
};

export const jsMoveLeft = (snake, direction) => {
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
  return newSnake;
};
