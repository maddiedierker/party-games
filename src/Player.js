import Collider, { ColliderType } from "@src/Collider";
import Settings from "@src/Settings";
import utils from "@src/utils";

let _instantiated = false;

export default function Player() {
  if (_instantiated) throw new Error("Player has already been instantiated");
  _instantiated = true;

  let _state = { ...Player.defaults };
  let _setStateCallbacks = [];
  _setState({
    collider: new Collider(
      ColliderType.player,
      ColliderType.player,
      _getPoints
    ),
  });

  function _broadcastState() {
    // some state shouldn't be broadcast ;)
    const s = { ..._state };
    delete s.collider;

    _setStateCallbacks.forEach(function (callback) {
      callback(s);
    });
  }

  function _getPoints(pos, width, height) {
    if (pos || width || height) {
      return utils.getSquarePoints(pos.x, pos.y, width, height);
    }

    const { position, w, h } = _state;
    if (!position) return;
    return utils.getSquarePoints(position.x, position.y, w, h);
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

  function _render(ctx) {
    const { position, color, username, w, h } = _state;
    if (!position) return; // might not have a position on first render
    Player.draw(ctx, position.x, position.y, w, h, color, username);
  }

  function _move({ key }) {
    const { position, w, h, speed } = _state;
    if (!position) return;

    const { rightKeys, leftKeys, downKeys, upKeys } = Settings;
    const xMovement = rightKeys.includes(key) - leftKeys.includes(key);
    const yMovement = downKeys.includes(key) - upKeys.includes(key);
    if (xMovement === 0 && yMovement === 0) return;

    // TODO: check for collisions
    const newX = position.x + xMovement * speed;
    const newY = position.y + yMovement * speed;
    const points = _getPoints({ x: newX, y: newY }, w, h);
    const collisions = _state.collider.getCollisions(points);
    console.log(collisions);

    if (collisions.length === 0) {
      _setState({
        position: { x: newX, y: newY },
      });
    }
  }

  return {
    collider: _state.collider,
    setState: _setState,
    registerSetStateCallback: _registerSetStateCallback,
    render: _render,
    move: _move,
    // debug stuff
    getPosition: function () {
      return _state.position;
    },
    setPosition: function (position) {
      _setState({ position });
    },
    getUsername: function () {
      return _state.username;
    },
    setUsername: function (username) {
      _setState({ username });
    },
    getColor: function () {
      return _state.color;
    },
    setColor: function (color) {
      _setState({ color });
    },
  };
}

Player.draw = function (ctx, x, y, w, h, color, username) {
  const fontSize = 8;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, w, h);
  ctx.font = `${fontSize}px Courier New`;
  ctx.fillText(username, x, y + h + fontSize);
};

Player.defaults = {
  username: "unknown",
  speed: 5,
  color: "yellow",
  w: 10,
  h: 10,
};
