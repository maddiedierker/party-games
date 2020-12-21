import env from "/.env";
import PubSub from "@src/PubSub";
import InputManager from "@src/InputManager";
import Player from "@src/Player";
import Settings from "@src/Settings";
import Playspace from "@src/Playspace";
import UI from "@src/UI";

if (!env) {
  throw new Error("env object is required");
}

// const pubSub = new PubSub(env.pubPublishKey, env.pubSubscribeKey);
// what channels do we need to subscribe to?
// what sorts of messages will be published?

const inputManager = new InputManager();
const player = new Player(10, 10);
inputManager.addListener("keydown", player.move);
const npc1 = new Player(30, 15, true);
const playspace = new Playspace([player, npc1], Settings);
new UI("app", [playspace]);
