import Message from "@src/Message";
import { MessageTypes } from "@src/MessageType";
import Settings from "@src/Settings";
import utils from "@src/utils";
import MessageType from "./MessageType";

export default function Player(x, y, pubSub) {
  const t = utils.type(self);
  let _color = "purple";
  let _username = "madkas";
  const _speed = 4;
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
      color: _color,
      username: _username,
      initial,
    });
    pubSub.publish(pubSub.channelFor(_room), msg);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _render(ctx) {
    Player.draw(ctx, x, y, _color, _username);
  }

  function _move(event) {
    const { key } = event;
    const { rightKeys, leftKeys, downKeys, upKeys } = Settings;
    const xMovement = rightKeys.includes(key) - leftKeys.includes(key);
    const yMovement = downKeys.includes(key) - upKeys.includes(key);
    if (xMovement === 0 && yMovement === 0) return;

    x += xMovement * _speed;
    y += yMovement * _speed;

    _publishSelf();
  }

  function _onMessage(msg) {
    const { message } = msg;
    if (message.type === MessageTypes.partyGoer && message.initial)
      _publishSelf(); // somebody joined, tell them you're here
  }

  function _onLeave() {
    _leaveRoom();
  }

  function _setUsername(u) {
    _username = u;
    _publishSelf();
  }

  function _setColor(c) {
    _color = c;
    _publishSelf();
  }

  return {
    render: _render,
    move: _move,
    onMessage: _onMessage,
    onLeave: _onLeave,
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
