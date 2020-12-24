import PartyGoersController from "@src/PartyGoersController";

export default function Room(name, player, pubSub) {
  player.registerSetStateCallback(_onSetState);
  let _partyGoersController = new PartyGoersController();

  (function _join() {
    const c = [_channel()];
    pubSub.subscribe(c);
    // tell party goers you're here
    player.broadcastState();
    // see who else is here
    pubSub.hereNow(c, function (status, response) {
      // filter out self
      const partyGoers = response.channels[_channel()].occupants.filter(
        function (occupant) {
          return occupant.uuid !== pubSub.uuid;
        }
      );
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

  function _leave() {
    pubSub.unsubscribe([_channel()]);
  }

  return {
    channel: _channel,
    onPresence: _onPresence,
    render: _render,
    leave: _leave,
  };
}

Room.channelFor = function (name) {
  return "room-" + name;
};
