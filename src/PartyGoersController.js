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
    delete _partyGoers[id];
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _onPresence(e) {
    const { action, uuid, state } = e;
    if (action === "join" || action === "state-change") {
      _createOrUpdate(uuid, state);
    } else if (action === "leave") {
      _leave(uuid);
    }
  }

  function _renderAll(ctx) {
    Object.values(_partyGoers).forEach(function (partyGoer) {
      partyGoer.render(ctx);
    });
  }

  function _bulkCreateOrUpdate(partyGoers) {
    Object.keys(partyGoers).forEach(function (uuid) {
      _createOrUpdate(uuid, partyGoers[uuid]);
    });
  }

  return {
    onPresence: _onPresence,
    renderAll: _renderAll,
    bulkCreateOrUpdate: _bulkCreateOrUpdate,
  };
}
