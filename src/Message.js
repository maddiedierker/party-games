import MType from "@src/MType";

export default function Message(type, options) {
  const _valid = typeof type === "string" && type.length > 0 && !!MType[type];
  if (!_valid)
    throw new Error(`Message cannot start: message type '${type}' invalid`);
  const _impl = new MType[type](options);

  return {
    ..._impl,
  };
}
