import UIElement from "@src/UIElement";
import style from "@src/style.css";

function Playspace(players, settings) {
  const _canvas = document.createElement("canvas");
  _canvas.width *= settings.scale;
  _canvas.height *= settings.scale;
  const _ctx = _canvas.getContext("2d");
  _ctx.scale(settings.scale, settings.scale);

  (function render() {
    clear();
    players.forEach(function (player) {
      player.render(_ctx);
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
