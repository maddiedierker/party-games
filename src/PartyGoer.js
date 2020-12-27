import Player from "@src/Player";

export default function PartyGoer(position, color, username) {
  let _state = { ...Player.defaults };
  _setState({ position, color, username });

  function _setState(newState) {
    _state = {
      ..._state,
      ...newState,
    };
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _render(ctx) {
    const { position } = _state;
    Player.draw(ctx, position.x, position.y, color, username);
  }

  function _update(options) {
    const { color: c, username: u, position: pos } = options;
    let newState = {};
    if (c) newState.color = c;
    if (u) newState.username = u;
    if (pos) newState.position = pos;
    _setState(newState);
  }

  return {
    render: _render,
    update: _update,
  };
}
