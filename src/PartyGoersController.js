import { MTypes } from "@src/MType";
import PartyGoer from "@src/PartyGoer";
import utils from "@src/utils";

export default function PartyGoersController(pubSub) {
  let _partyGoers = {};
  const t = utils.type(this);

  function _createOrUpdate(id, { position }) {
    const existing = _partyGoers[id];
    if (existing) {
      existing.move(position.x, position.y);
    } else {
      _partyGoers[id] = new PartyGoer(id, position.x, position.y, pubSub);
    }
  }

  function _leave(id) {
    delete _partyGoers[id];
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _onMessage(msg) {
    const { publisher, message } = msg;
    switch (message.type) {
      case MTypes.position:
        _createOrUpdate(publisher, message);
        break;
      case MTypes.leave:
        _leave(publisher);
        break;
      default:
        throw new Error(`${t} unhandled message type '${message.type}'`);
    }
  }

  function _renderAll(ctx) {
    Object.values(_partyGoers).forEach(function (partyGoer) {
      partyGoer.render(ctx);
    });
  }

  return {
    onMessage: _onMessage,
    renderAll: _renderAll,
  };
}
