import utils from "@src/utils";

export default function UI(rootId, children) {
  const t = utils.type(this);
  const rootEl = document.getElementById(rootId);
  if (!rootEl)
    utils.throwStartupError(t, `element with id '${rootId}' does not exist`);

  children.forEach(function (child) {
    if (!child) utils.throwStartupError(t, "empty child");
    if (!child.valid || !child.valid())
      utils.throwStartupError(t, "invalid UI child");

    if (child.classNames.length > 0) {
      const { classNames, el } = child;
      classNames.forEach(function (className) {
        el.classList.add(className);
      });
    }
    rootEl.append(child.el);
  });
}
