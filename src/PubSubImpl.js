import PubNub from "pubnub";

function PubSubImpl(publishKey, subscribeKey) {
  let _onMessageCallbacks = [];

  function _throwStartupError(msg) {
    throw new Error(`PubSubImpl cannot start: ${msg}`);
  }

  if (!publishKey) {
    _throwStartupError("publishKey is missing");
  } else if (!subscribeKey) {
    _throwStartupError("subscribeKey is missing");
  }

  /////////////////////////////////////////////////////////////
  ////// INITIALIZE SERVICE
  /////////////////////////////////////////////////////////////
  const { _uuid, _service } = (function serviceInit() {
    const _uuid = (function () {
      const uuid = localStorage.getItem(subscribeKey + "uuid");
      if (uuid) return uuid;
      return PubNub.generateUUID();
    })();
    const _service = new PubNub({
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

    return { _uuid, _service };
  })();

  /////////////////////////////////////////////////////////////
  ////// SERVICE LISTENERS
  /////////////////////////////////////////////////////////////
  function _onStatusEvent(e) {
    console.log("STATUS", e);
  }

  function _onMessage(msg) {
    // you can't get messages from yourself
    if (msg.publisher === _uuid) return;
    _onMessageCallbacks.forEach(function (callback) {
      callback(msg);
    });
    // console.log("MESSAGE", msg);
  }

  function _onPresenceEvent(e) {
    console.log("PRESENCE", e);
  }

  function _onPublish(status, response) {
    console.log("AFTER PUBLISH", status, response);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _publish(channel, message) {
    _service.publish({ channel, message }, _onPublish);
  }

  function _subscribe(channels) {
    _service.subscribe({ channels, withPresence: true });
  }

  function _addListener(type, callback) {
    if (type === "message") _onMessageCallbacks.push(callback);
  }

  return {
    publish: _publish,
    subscribe: _subscribe,
    addListener: _addListener,
    uuid: _uuid,
  };
}

export default PubSubImpl;
