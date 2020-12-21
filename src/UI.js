function UI(rootId, children) {
  function _throwStartupError(msg) {
    throw new Error(`UI cannot start: ${msg}`);
  }

  const rootEl = document.getElementById(rootId);
  if (!rootEl)
    _throwStartupError(`element with rootId '${rootId}' does not exist`);

  children.forEach(function (child) {
    if (!child) _throwStartupError("UI cannot start: empty child");
    if (!child.valid || !child.valid())
      _throwStartupError("UI cannot start: invalid UI child");

    if (child.classNames.length > 0) {
      const { classNames, el } = child;
      classNames.forEach(function (className) {
        el.classList.add(className);
      });
    }
    rootEl.append(child.el);
  });
}

export default UI;
