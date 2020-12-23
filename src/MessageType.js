import utils from "@src/utils";

export const MessageTypes = {
  partyGoer: "partyGoer",
  leave: "leave",
};

function MessageType() {}

MessageType.partyGoer = function (options) {
  ["position", "color", "username"].forEach(function (option) {
    if (!options[option])
      utils.throwStartupError("MessageType.partyGoer", `${option} is missing`);
  });

  return {
    type: MessageTypes.partyGoer,
    ...options,
  };
};

MessageType.leave = function () {
  return {
    type: MessageTypes.leave,
  };
};

export default MessageType;
