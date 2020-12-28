import Player from "@src/Player";
import Collider, { ColliderType } from "@src/Collider";
import utils from "@src/utils";

export default function PartyGoer(id, position, color, username) {
  let _state = { ...Player.defaults };
  const cType = ColliderType.partyGoer;
  _setState({
    position,
    color,
    username,
    collider: new Collider(`${cType}/${id}`, cType, _getPoints),
  });

  function _setState(newState) {
    _state = {
      ..._state,
      ...newState,
    };
  }

  function _getPoints() {
    const { position, w, h } = _state;
    return utils.paddedGetSquarePoints(position.x, position.y, w, h);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _render(ctx) {
    const { position, w, h, color, username } = _state;
    Player.draw(ctx, position.x, position.y, w, h, color, username);
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
