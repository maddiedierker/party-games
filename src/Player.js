import Settings from "@src/Settings";

export default function Player(x, y) {
  let _state = {
    position: { x, y },
    color: "purple",
    username: "madkas",
    speed: 4,
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
    Player.draw(ctx, position.x, position.y, color, username);
  }

  function _move(event) {
    const { key } = event;
    const { rightKeys, leftKeys, downKeys, upKeys } = Settings;
    const xMovement = rightKeys.includes(key) - leftKeys.includes(key);
    const yMovement = downKeys.includes(key) - upKeys.includes(key);
    if (xMovement === 0 && yMovement === 0) return;

    const { position, speed } = _state;
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
