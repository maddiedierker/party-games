function type(self) {
  return self.__proto__.constructor.name; // i'm not sorry
}

function throwError(msg) {
  throw new Error(msg);
}

function throwStartupError(type, msg) {
  throw new Error(`${type} cannot start: ${msg}`);
}

function throwUnhandledMessageError(type, msgType) {
  throw new Error(`${type} unhandled message type '${msgType}'`);
}

function getSquarePoints(x, y, w, h) {
  function _e(msg) {
    throwError("utils.getSquarePoints: " + msg);
  }

  if (!x || !y) _e("x and y required");
  if (!w || !h) _e("w and h required");

  return [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
}

function paddedGetSquarePoints(x, y, w, h, padding = 2) {
  return getSquarePoints(
    x + padding,
    y + padding,
    w - padding * 2,
    h - padding * 2
  );
}

function withinSquare(point, squarePoints) {
  return (
    point[0] >= squarePoints[0][0] &&
    point[0] <= squarePoints[1][0] &&
    point[1] >= squarePoints[0][1] &&
    point[1] <= squarePoints[2][1]
  );
}

export default {
  type,
  throwError,
  throwStartupError,
  throwUnhandledMessageError,
  paddedGetSquarePoints,
  withinSquare,
};
