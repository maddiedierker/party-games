import { MessageTypes } from "@src/MessageType";
import PartyGoer from "@src/PartyGoer";
import utils from "@src/utils";

export default function PartyGoersController(pubSub) {
  let _partyGoers = {};
  const t = utils.type(this);

  function _createOrUpdate(id, options) {
    const partyGoer = _partyGoers[id];
    if (partyGoer) {
      partyGoer.update(options);
      return;
    }

    const { position, color, username } = options;
    _partyGoers[id] = new PartyGoer(
      id,
      position.x,
      position.y,
      color,
      username
    );
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
      case MessageTypes.partyGoer:
        _createOrUpdate(publisher, message);
        break;
      case MessageTypes.leave:
        _leave(publisher);
        break;
      default:
        utils.throwUnhandledMessageError(t, message.type);
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
