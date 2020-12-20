import PubNub from "pubnub";

function PubSubImpl(publishKey, subscribeKey) {
  function _throwStartupError(msg) {
    throw new Error(`PubSubImpl cannot start: ${msg}`);
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

  function _onPublish(status, response) {
    console.log("AFTER PUBLISH", status, response);
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
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _publish(channel, message) {
    _service.publish({ channel, message }, _onPublish);
  }

  function _subscribe(channels) {
    _service.subscribe({ channels, withPresence: true });
  }

  return {
    publish: _publish,
    subscribe: _subscribe,
  };
}

export default PubSubImpl;
