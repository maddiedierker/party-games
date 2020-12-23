import MessageType from "@src/MessageType";
import utils from "@src/utils";

export default function Message(type, options) {
  const _valid =
    typeof type === "string" && type.length > 0 && !!MessageType[type];
  if (!_valid) utils.throwStartupError(t, `invalid message type '${type}'`);
  const _impl = new MessageType[type](options);

  return {
    ..._impl,
  };
}
