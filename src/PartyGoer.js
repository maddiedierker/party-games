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
    if (options.color) color = options.color;
    if (options.username) username = options.username;
    if (options.position) _move(options.position);
  }

  return {
    render: _render,
    update: _update,
  };
}
