import Settings from "@src/Settings";
import UIElement from "@src/UIElement";
import style from "@src/style.css";

export default function Playspace(player, partyGoersController) {
  const _canvas = document.createElement("canvas");
  const _ctx = _canvas.getContext("2d");

  (function _canvasSetup() {
    _canvas.width *= Settings.scale;
    _canvas.height *= Settings.scale;
    _ctx.scale(Settings.scale, Settings.scale);
  })();

  (function render() {
    clear();
    player.render(_ctx);
    partyGoersController.renderAll(_ctx);

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
