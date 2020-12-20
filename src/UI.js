function UI(rootId) {
  const rootEl = document.getElementById(rootId);
  if (!rootEl) {
    throw new Error(
      `UI cannot start: element with rootId '${rootId}' does not exist`
    );
  }

  function _createInput() {
    return document.createElement("input");
  }

  const usernameInput = _createInput();
  const chatInput = _createInput();
  const playspace = (function () {
    return document.createElement("canvas");
  })();
  const chatLog = (function () {
    return document.createElement("div");
  })();

  [usernameInput, chatInput, playspace, chatLog].forEach(function (el) {
    rootEl.append(el);
  });
}

export default UI;
