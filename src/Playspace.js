function Playspace() {
  // maybe use p5/p5.play?
  // renders environment (on its own canvas)
  // renders players (on a separate canvas because they'll need to re-render a lot)

  const _el = document.createElement("canvas");
  return {
    el: _el,
  };
}

export default Playspace;
