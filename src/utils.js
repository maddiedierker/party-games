function type(self) {
  return self.__proto__.constructor.name; // i'm not sorry
}

function throwStartupError(type, msg) {
  throw new Error(`${type} cannot start: ${msg}`);
}

export default {
  type,
  throwStartupError,
};
