import PubNub from "pubnub";

function PubSubImpl(publishKey, subscribeKey) {
  if (!publishKey) {
    throw new Error("PubSub cannot start: publishKey is missing");
  } else if (!subscribeKey) {
    throw new Error("PubSub cannot start: subscribeKey is missing");
  }

  function _getUuid() {
    return "madkas";
  }

  const service = new PubNub({
    publishKey,
    subscribeKey,
    uuid: _getUuid(),
  });
  if (!service) {
    throw new Error("PubSub cannot start: service failed to initialize");
  }

  function _publish() {
    console.log("publishing");
    // service.publish();
  }

  function _subscribe() {
    console.log("subscribing");
  }

  return {
    publish: _publish,
    subscribe: _subscribe,
  };
}

export default PubSubImpl;
