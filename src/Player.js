function Player(x, y, npc = false) {
  function _render(ctx) {
    ctx.beginPath();
    ctx.rect(x, y, 10, 10);
    ctx.stroke();
  }

  function _move(event) {
    const { key } = event;
    const xMovement =
      ["ArrowRight", "d"].includes(key) - ["ArrowLeft", "a"].includes(key);
    const yMovement =
      ["ArrowDown", "s"].includes(key) - ["ArrowUp", "w"].includes(key);
    if (xMovement === 0 && yMovement === 0) return;

    x += xMovement;
    y += yMovement;
  }

  return {
    npc,
    position: { x, y },
    render: _render,
    move: npc ? undefined : _move,
  };
}

export default Player;
