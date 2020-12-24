// NOTHING IS CURRENTLY USING THESE TYPES.
// I DON'T WANT TO DELETE THEM YET. EXAMPLE USAGE BELOW.

export const MessageTypes = {
  example: "example",
};

export default function MessageType() {}
MessageType.example = function (options) {
  return {
    type: MessageTypes.example,
  };
};
