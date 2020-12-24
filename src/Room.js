import PartyGoersController from "@src/PartyGoersController";

const RoomDefaults = {
  position: { x: 20, y: 15 },
};

export default function Room(name, player, pubSub) {
  player.registerSetStateCallback(_onSetState);
  let _partyGoersController = new PartyGoersController();

  (function _join() {
    const c = [_channel()];
    pubSub.subscribe(c);
    pubSub.getState(c, function (status, response) {
      if (!response) return;
      player.setState({ ...RoomDefaults, ...response.channels[_channel()] });
    });
    pubSub.hereNow(c, function (status, response) {
      // TODO: retry on failure
      if (!response) return;

      const partyGoers = response.channels[_channel()].occupants.filter(
        function (occupant) {
          return occupant.uuid !== pubSub.uuid;
        }
      );
      _partyGoersController.bulkCreateOrUpdate(partyGoers);
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
