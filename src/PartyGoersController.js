import PartyGoer from "@src/PartyGoer";

// keeps track of all PartyGoers
// creates new PartyGoers
// is this just a factory? idk
export default function PartyGoersController() {
  let _partyGoers = {};

  function _onMessage(msg) {
    // handle position message
    console.log(msg);
  }

  return {
    onMessage: _onMessage,
  };
}
