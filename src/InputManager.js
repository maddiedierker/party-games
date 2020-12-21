function InputManager() {
  let _listeners = [];

  function _addListener(type, callback) {
    _listeners.push({ type, callback });
    window.addEventListener(type, callback);
  }

  window.onunload = function () {
    _listeners.forEach(function (listener) {
      const { type, callback } = listener;
      window.removeEventListener(type, callback);
    });
  };

  return {
    addListener: _addListener,
  };
}

export default InputManager;
