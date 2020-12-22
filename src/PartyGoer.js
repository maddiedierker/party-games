import Player from "@src/Player";

export default function PartyGoer(id, x, y) {
  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _render(ctx) {
    Player.draw(ctx, x, y);
  }

  function _move(x1, y1) {
    x = x1;
    y = y1;
  }

  return {
    render: _render,
    move: _move,
  };
}
