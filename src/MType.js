export const MTypes = {
  position: "position",
};

function MType() {}
MType.position = function (options) {
  if (!options.position)
    throw new Error(`MType.position cannot start: position is missing`);

  return {
    type: "position",
    ...options,
  };
};

export default MType;
