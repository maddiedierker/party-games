import Message from "@src/Message";
import { MTypes } from "@src/MType";
import Settings from "@src/Settings";

export default function Player(x, y, pubSub) {
  const _room = "main";
  pubSub.subscribe([_roomChannel()]);

  function _roomChannel() {
    return "room-" + _room;
  }

  function _publishPosition() {
    const msg = new Message(MTypes.position, { position: { x, y } });
    pubSub.publish(_roomChannel(), msg);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _render(ctx) {
    ctx.beginPath();
    ctx.rect(x, y, 10, 10);
    ctx.stroke();
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

  return {
    render: _render,
    move: _move,
  };
}
