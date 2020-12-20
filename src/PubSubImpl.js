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

  const _uuid = (function () {
    const uuid = localStorage.getItem(subscribeKey + "uuid");
    if (uuid) return uuid;
    return PubNub.generateUUID();
  })();
  const service = new PubNub({
    publishKey,
    subscribeKey,
    uuid: _uuid,
  });
  if (!service) _throwStartupError("service failed to initialize");
  service.addListener({
    status: function (statusEvent) {
      console.log("STATUS", statusEvent);
    },
    message: function (msg) {
      console.log("MESSAGE", msg);
    },
    presence: function (presenceEvent) {
      console.log("PRESENCE", presenceEvent);
    },
  });

  function _publish() {
    service.publish(
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
    service.subscribe({
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
