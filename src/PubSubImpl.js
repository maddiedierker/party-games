import PubNub from "pubnub";
import utils from "@src/utils";
import Store from "@src/Store";

export default function PubSubImpl(publishKey, subscribeKey) {
  const t = utils.type(self);
  let _onMessageCallbacks = [];

  if (!publishKey) {
    utils.throwStartupError(t, "publishKey is missing");
  } else if (!subscribeKey) {
    utils.throwStartupError(t, "subscribeKey is missing");
  }

  /////////////////////////////////////////////////////////////
  ////// INITIALIZE SERVICE
  /////////////////////////////////////////////////////////////
  const { _uuid, _service } = (function serviceInit() {
    const _uuid = (function () {
      const uuid = Store.uuid.get(subscribeKey);
      if (uuid) return uuid;
      return PubNub.generateUUID();
    })();
    const _service = new PubNub({
      publishKey,
      subscribeKey,
      uuid: _uuid,
    });
    if (!_service) utils.throwStartupError(t, "service initialization failed");
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
    if (msg.publisher === _uuid) return; // can't get messages from yourself
    _onMessageCallbacks.forEach(function (callback) {
      callback(msg);
    });
    // console.log("MESSAGE", msg);
  }

  function _onPresenceEvent(e) {
    console.log("PRESENCE", e);
  }

  function _onPublish(status, response) {
    // console.log("AFTER PUBLISH", status, response);
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

  function _unsubscribe(channels) {
    _service.unsubscribe({ channels });
  }

  function _addListener(type, callback) {
    if (type === "message") _onMessageCallbacks.push(callback);
  }

  function _channelFor(roomName) {
    return "room-" + roomName;
  }

  return {
    publish: _publish,
    subscribe: _subscribe,
    unsubscribe: _unsubscribe,
    addListener: _addListener,
    channelFor: _channelFor,
    uuid: _uuid,
  };
}
