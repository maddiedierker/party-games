export default function InputManager() {
  let _listeners = [];
  let _unloadEvents = [];

  window.onunload = function () {
    _unloadEvents.forEach(function (callback) {
      callback();
    });

    _listeners.forEach(function (listener) {
      const { type, callback } = listener;
      window.removeEventListener(type, callback);
    });
  };

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _addListener(type, callback) {
    _listeners.push({ type, callback });
    window.addEventListener(type, callback);
  }

  function _addUnloadEvent(callback) {
    _unloadEvents.push(callback);
  }

  return {
    addListener: _addListener,
    addUnloadEvent: _addUnloadEvent,
  };
}
