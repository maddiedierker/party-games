import Message from "@src/Message";
import { MTypes } from "@src/MType";
import Settings from "@src/Settings";

export default function Player(x, y, pubSub) {
  let _room;
  _onJoinRoom("main");

  function _roomChannel() {
    return "room-" + _room;
  }

  function _onJoinRoom(name) {
    _room = name;
    pubSub.subscribe([_roomChannel()]);
    _publishPosition(true);
  }

  function _publishPosition(initial = false) {
    const msg = new Message(MTypes.position, { position: { x, y }, initial });
    pubSub.publish(_roomChannel(), msg);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _render(ctx) {
    Player.draw(ctx, x, y);
  }

  function _move(event) {
    const { key } = event;
    const { rightKeys, leftKeys, downKeys, upKeys } = Settings;
    const xMovement = rightKeys.includes(key) - leftKeys.includes(key);
    const yMovement = downKeys.includes(key) - upKeys.includes(key);
    if (xMovement === 0 && yMovement === 0) return;

    x += xMovement;
    y += yMovement;

    _publishPosition();
  }

  function _onMessage(msg) {
    const { message } = msg;
    if (message.type === MTypes.position && message.initial) {
      _publishPosition();
    }
  }

  return {
    render: _render,
    move: _move,
    onMessage: _onMessage,
  };
}
Player.draw = function (ctx, x, y) {
  ctx.beginPath();
  ctx.rect(x, y, 10, 10);
  ctx.stroke();
};
