import PartyGoersController from "@src/PartyGoersController";

const RoomDefaults = {
  position: { x: 20, y: 15 },
};

export default function Room(name, player, pubSub) {
  player.registerSetStateCallback(_onSetState);
  let _partyGoersController = new PartyGoersController();

  (function _init() {
    const c = [_channel()];

    // subscribe to room channel
    pubSub.subscribe(c);

    // load any existing state for player
    pubSub.getState(c, function (status, response) {
      if (!response) return;
      player.setState({ ...RoomDefaults, ...response.channels[_channel()] });
    });

    // load party goers
    pubSub.hereNow(c, function (status, response) {
      if (!response) return;
      const partyGoers = response.channels[_channel()].occupants.filter(
        function (o) {
          return o.uuid !== pubSub.uuid;
        }
      );
      _partyGoersController.bulkCreateOrUpdate(partyGoers);
    });
  })();

  function _onSetState(state) {
    pubSub.setState([_channel()], state);
  }

  function _channel() {
    return Room.channelFor(name);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _onPresence(e) {
    const { action, uuid, state } = e;

    if (action === "state-change") {
      _partyGoersController.createOrUpdate(uuid, state);
    } else if (action === "leave" || action === "timeout") {
      _partyGoersController.leave(uuid);
    }
  }

  function _render(ctx) {
    player.render(ctx);
    _partyGoersController.renderAll(ctx);
  }

  function _leave() {
    pubSub.unsubscribe({ channels: [_channel()] });
  }

  return {
    onPresence: _onPresence,
    render: _render,
    leave: _leave,
  };
}

Room.channelFor = function (name) {
  return "room-" + name;
};
