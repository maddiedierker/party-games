import Settings from "@src/Settings";

export default function Player() {
  let _state = {
    username: "unknown",
    speed: 5,
    color: "yellow",
  };
  let _setStateCallbacks = [];

  function _setState(newState) {
    _state = {
      ..._state,
      ...newState,
    };
    _broadcastState();
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _setState(newState) {
    _state = {
      ..._state,
      ...newState,
    };
    _broadcastState();
  }

  function _registerSetStateCallback(callback) {
    _setStateCallbacks.push(callback);
  }

  function _broadcastState() {
    _setStateCallbacks.forEach(function (callback) {
      callback(_state);
    });
  }

  function _render(ctx) {
    const { position, color, username } = _state;
    if (!position || !position.x || !position.y || !color || !username) return;
    Player.draw(ctx, position.x, position.y, color, username);
  }

  function _move(event) {
    const { position, speed } = _state;
    if (!position || !position.x || !position.y) return;
    const { key } = event;
    const { rightKeys, leftKeys, downKeys, upKeys } = Settings;
    const xMovement = rightKeys.includes(key) - leftKeys.includes(key);
    const yMovement = downKeys.includes(key) - upKeys.includes(key);
    if (xMovement === 0 && yMovement === 0) return;

    _setState({
      position: {
        x: position.x + xMovement * speed,
        y: position.y + yMovement * speed,
      },
    });
  }

  function _setUsername(username) {
    _setState({ username });
  }

  function _setColor(color) {
    _setState({ color });
  }

  return {
    setState: _setState,
    registerSetStateCallback: _registerSetStateCallback,
    broadcastState: _broadcastState,
    render: _render,
    move: _move,
    setUsername: _setUsername,
    setColor: _setColor,
  };
}

Player.draw = function (ctx, x, y, color, username) {
  const w = 10;
  const h = 10;
  const fontSize = 8;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, w, h);
  ctx.font = `${fontSize}px Courier New`;
  ctx.fillText(username, x, y + h + fontSize);
};
