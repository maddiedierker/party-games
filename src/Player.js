import Message from "@src/Message";
import { MessageTypes } from "@src/MessageType";
import Settings from "@src/Settings";
import utils from "@src/utils";

export default function Player(x, y, pubSub) {
  const t = utils.type(self);
  let _room;
  _joinRoom("main");

  function _joinRoom(name) {
    _room = name;
    pubSub.subscribe([pubSub.channelFor(_room)]);
    _publishSelf(true);
  }

  function _leaveRoom() {
    const msg = new Message(MessageTypes.leave);
    const channel = pubSub.channelFor(_room);
    pubSub.publish(channel, msg);
    pubSub.unsubscribe([channel]);
  }

  function _publishSelf(initial = false) {
    const msg = new Message(MessageTypes.partyGoer, {
      position: { x, y },
      color: "purple",
      username: "madkas",
      initial,
    });
    pubSub.publish(pubSub.channelFor(_room), msg);
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
    switch (message.type) {
      case MessageTypes.partyGoer:
        if (message.initial) _publishSelf(); // somebody joined, tell them you're here
        break;
      default:
        utils.throwUnhandledMessageError(t, message.type);
    }
  }

  function _onLeave() {
    _leaveRoom();
  }

  return {
    render: _render,
    move: _move,
    onMessage: _onMessage,
    onLeave: _onLeave,
  };
}

Player.draw = function (ctx, x, y) {
  ctx.beginPath();
  ctx.rect(x, y, 10, 10);
  ctx.stroke();
};
