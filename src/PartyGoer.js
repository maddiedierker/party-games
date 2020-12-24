import Player from "@src/Player";

export default function PartyGoer(id, x, y, color, username) {
  function _move(position) {
    x = position.x;
    y = position.y;
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _render(ctx) {
    Player.draw(ctx, x, y, color, username);
  }

  function _update(options) {
    const { color: c, username: u, position: pos } = options;
    if (c) color = c;
    if (u) username = u;
    if (pos) _move(pos);
  }

  return {
    render: _render,
    update: _update,
  };
}
