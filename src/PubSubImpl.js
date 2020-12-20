import PubNub from "pubnub";

function PubSubImpl(publishKey, subscribeKey) {
  function _throwStartupError(msg) {
    throw new Error("PubSubImpl cannot start: " + msg);
  }

  if (!publishKey) {
    _throwStartupError("publishKey is missing");
  } else if (!subscribeKey) {
    _throwStartupError("subscribeKey is missing");
  }

  /////////////////////////////////////////////////////////////
  ////// SERVICE LISTENERS
  /////////////////////////////////////////////////////////////
  function _onStatusEvent(e) {
    console.log("STATUS", e);
  }

  function _onMessage(msg) {
    console.log("MESSAGE", msg);
  }

  function _onPresenceEvent(e) {
    console.log("PRESENCE", e);
  }

  /////////////////////////////////////////////////////////////
  ////// INITIALIZE SERVICE
  /////////////////////////////////////////////////////////////
  let _uuid, _service;
  (function () {
    _uuid = (function () {
      const uuid = localStorage.getItem(subscribeKey + "uuid");
      if (uuid) return uuid;
      return PubNub.generateUUID();
    })();
    _service = new PubNub({
      publishKey,
      subscribeKey,
      uuid: _uuid,
    });
    if (!_service) _throwStartupError("service failed to initialize");
    _service.addListener({
      status: _onStatusEvent,
      message: _onMessage,
      presence: _onPresenceEvent,
    });
  })();

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _publish() {
    _service.publish(
      {
        message: "hiya",
        channel: "room-main",
      },
      function (status, response) {
        console.log("AFTER PUBLISH", status, response);
      }
    );
  }

  function _subscribe() {
    _service.subscribe({
      channels: ["room-main"],
      withPresence: true,
    });
  }

  return {
    publish: _publish,
    subscribe: _subscribe,
  };
}

export default PubSubImpl;
