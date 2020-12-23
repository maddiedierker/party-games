export const MTypes = {
  position: "position",
  leave: "leave",
};

function MType() {}

MType.position = function (options) {
  if (!options.position)
    throw new Error(`MType.position cannot start: position is missing`);

  return {
    type: MTypes.position,
    ...options,
  };
};

MType.leave = function () {
  return {
    type: MTypes.leave,
  };
};

export default MType;
