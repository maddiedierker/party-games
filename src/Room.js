import PartyGoersController from "@src/PartyGoersController";

export default function Room(name, player, pubSub) {
  player.registerSetStateCallback(_onSetState);
  let _partyGoersController = new PartyGoersController();

  (function _join() {
    const c = [_channel()];
    pubSub.subscribe(c);
    player.broadcastState();
    pubSub.hereNow(c, function (status, response) {
      // filter out self
      let partyGoers = {};
      response.channels[_channel()].occupants.forEach(function (occupant) {
        if (occupant.uuid !== pubSub.uuid)
          partyGoers[occupant.uuid] = occupant.state;
      });
      _partyGoersController.bulkCreateOrUpdate(partyGoers);

      console.log("WHO'S HERE", status, response);
    });
  })();

  function _onSetState(state) {
    pubSub.setState([_channel()], state);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _channel() {
    return Room.channelFor(name);
  }

  function _onPresence(e) {
    _partyGoersController.onPresence(e);
  }

  function _render(ctx) {
    player.render(ctx);
    _partyGoersController.renderAll(ctx);
  }

  return {
    channel: _channel,
    onPresence: _onPresence,
    render: _render,
  };
}

Room.channelFor = function (name) {
  return "room-" + name;
};
