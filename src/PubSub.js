import PubNub from "pubnub";
import utils from "@src/utils";
import Store from "@src/Store";

export default function PubSub(publishKey, subscribeKey) {
  const t = utils.type(self);
  let _onMessageCallbacks = [];
  let _onPresenceCallbacks = [];

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
    if (e.uuid === _uuid) return; // can't get events from yourself
    _onPresenceCallbacks.forEach(function (callback) {
      callback(e);
    });

    console.log("PRESENCE", e);
  }

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _publish(channel, message) {
    _service.publish({ channel, message }, function (status, response) {
      // console.log("AFTER PUBLISH", status, response);
    });
  }

  function _subscribe(channels) {
    _service.subscribe({ channels, withPresence: true });
  }

  function _unsubscribe(channels) {
    _service.unsubscribe({ channels });
  }

  function _hereNow(channels, callback) {
    return _service.hereNow(
      { channels, includeState: true },
      function (status, response) {
        // TODO: retry on failure
        if (callback) callback(status, response);
      }
    );
  }

  function _getState(channels, callback) {
    return _service.getState({ channels }, callback);
  }

  function _setState(channels, state, callback) {
    _service.setState({ channels, state }, function (status, response) {
      // TODO: retry on failure
      if (callback) callback(status, response);
    });
  }

  function _addListener(type, callback) {
    switch (type) {
      case "message":
        _onMessageCallbacks.push(callback);
        break;
      case "presence":
        _onPresenceCallbacks.push(callback);
        break;
      default:
        utils.throwUnhandledMessageError("PubSub._addListener", type);
    }
  }

  return {
    // publish: _publish, // unused
    subscribe: _subscribe,
    unsubscribe: _unsubscribe,
    hereNow: _hereNow,
    getState: _getState,
    setState: _setState,
    addListener: _addListener,
    uuid: _uuid,
  };
}
