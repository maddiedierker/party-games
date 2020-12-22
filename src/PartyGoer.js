import Player from "@src/Player";

export default function PartyGoer() {
  return {
    ...new Player(),
    move: undefined,
  };
}
