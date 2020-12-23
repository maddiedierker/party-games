function type(self) {
  return self.__proto__.constructor.name; // i'm not sorry
}

function throwError(msg) {
  throw new Error(msg);
}

function throwStartupError(type, msg) {
  throw new Error(`${type} cannot start: ${msg}`);
}

function throwUnhandledMessageError(type, msgType) {
  throw new Error(`${type} unhandled message type '${msgType}'`);
}

export default {
  type,
  throwError,
  throwStartupError,
  throwUnhandledMessageError,
};
