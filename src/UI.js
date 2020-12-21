import style from "@src/style.css";
console.log(style);

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
    const el = document.createElement("canvas");

    return el;
  })();
  const chatLog = (function () {
    return document.createElement("div");
  })();

  [usernameInput, chatInput, playspace, chatLog].forEach(function (el) {
    rootEl.append(el);
  });
}

export default UI;
