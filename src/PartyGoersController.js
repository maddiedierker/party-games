import PartyGoer from "@src/PartyGoer";

export default function PartyGoersController() {
  let _partyGoers = {};

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _createOrUpdate(id, options) {
    const partyGoer = _partyGoers[id];
    if (partyGoer) {
      partyGoer.update(options);
      return;
    }

    const { position, color, username } = options;
    _partyGoers[id] = new PartyGoer(id, position, color, username);
  }

  function _bulkCreateOrUpdate(partyGoers) {
    partyGoers.forEach(function (partyGoer) {
      _createOrUpdate(partyGoer.uuid, partyGoer.state);
    });
  }

  function _leave(id) {
    if (_partyGoers.hasOwnProperty(id)) delete _partyGoers[id];
  }

  function _renderAll(ctx) {
    Object.values(_partyGoers).forEach(function (partyGoer) {
      partyGoer.render(ctx);
    });
  }

  return {
    createOrUpdate: _createOrUpdate,
    bulkCreateOrUpdate: _bulkCreateOrUpdate,
    leave: _leave,
    renderAll: _renderAll,
  };
}
