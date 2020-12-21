function UI(rootId, children) {
  const rootEl = document.getElementById(rootId);
  if (!rootEl) {
    throw new Error(
      `UI cannot start: element with rootId '${rootId}' does not exist`
    );
  }

  children.forEach(function (child) {
    rootEl.append(child);
  });
}

export default UI;
