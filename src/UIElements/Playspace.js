import Settings from "@src/Settings";
import UIElement from "@src/UIElement";
import style from "@src/style.css";

function Playspace(partyGoers) {
  const _canvas = document.createElement("canvas");
  _canvas.width *= Settings.scale;
  _canvas.height *= Settings.scale;
  const _ctx = _canvas.getContext("2d");
  _ctx.scale(Settings.scale, Settings.scale);

  (function render() {
    clear();
    partyGoers.forEach(function (partyGoer) {
      partyGoer.render(_ctx);
    });

    requestAnimationFrame(render);
  })();

  function clear() {
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
  }

  return {
    ...new UIElement(),
    el: _canvas,
    classNames: [style.playspace],
  };
}

export default Playspace;
