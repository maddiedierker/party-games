import { MTypes } from "@src/MType";
import PartyGoer from "@src/PartyGoer";
import utils from "@src/utils";

// keeps track of all PartyGoers
// creates new PartyGoers
// is this just a factory? idk
export default function PartyGoersController(pubSub) {
  let _partyGoers = {};

  function _createOrUpdate(id, { position }) {
    const existing = _partyGoers[id];
    if (existing) {
      existing.move(position.x, position.y);
    } else {
      _partyGoers[id] = new PartyGoer(id, position.x, position.y, pubSub);
    }
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
      default:
        throw new Error(
          `${utils.type(this)} unhandled message type '${message.type}'`
        );
    }

    if (message.type === MTypes.position) {
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
