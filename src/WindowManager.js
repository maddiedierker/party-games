export default function WindowManager() {
  let _eventListeners = [];
  let _unloadCallbacks = [];

  window.onunload = function () {
    _unloadCallbacks.forEach(function (callback) {
      callback();
    });

    _eventListeners.forEach(function ({ type, callback }) {
      window.removeEventListener(type, callback);
    });
  };

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _addEventListener(type, callback) {
    _eventListeners.push({ type, callback });
    window.addEventListener(type, callback);
  }

  function _addUnloadCallback(callback) {
    _unloadCallbacks.push(callback);
  }

  return {
    addEventListener: _addEventListener,
    addUnloadCallback: _addUnloadCallback,
  };
}
