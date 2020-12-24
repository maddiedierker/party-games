import PartyGoer from "@src/PartyGoer";
import utils from "@src/utils";

export default function PartyGoersController() {
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
    if (_partyGoers.hasOwnProperty(id)) delete _partyGoers[id];
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _onPresence(e) {
    const { action, uuid, state } = e;
    // TODO: how to handle "join" events?
    if (action === "state-change") {
      _createOrUpdate(uuid, state);
    } else if (action === "leave" || action === "timeout") {
      _leave(uuid);
    }
  }

  function _renderAll(ctx) {
    Object.values(_partyGoers).forEach(function (partyGoer) {
      partyGoer.render(ctx);
    });
  }

  function _bulkCreateOrUpdate(partyGoers) {
    partyGoers.forEach(function (partyGoer) {
      _createOrUpdate(partyGoer.uuid, partyGoer.state);
    });
  }

  return {
    onPresence: _onPresence,
    renderAll: _renderAll,
    bulkCreateOrUpdate: _bulkCreateOrUpdate,
  };
}
