export default function UIElement() {
  function _valid() {
    return this.is === "UIElement" && this.el && this.classNames.length >= 0;
  }

  return {
    el: undefined,
    classNames: [],
    is: "UIElement", // don't fucking change this, ok
    valid: _valid,
  };
}
