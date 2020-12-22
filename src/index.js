import env from "/.env";
import PubSub from "@src/PubSub";
import InputManager from "@src/InputManager";
import Player from "@src/Player";
import Playspace from "@src/UIElements/Playspace";
import UI from "@src/UI";

if (!env) {
  throw new Error("env object is required");
}

const pubSub = new PubSub(env.pubPublishKey, env.pubSubscribeKey);
console.log(pubSub.uuid, "-- it me");
const player = new Player(10, 10, pubSub);
const inputManager = new InputManager();
const playspace = new Playspace([player]);
new UI("app", [playspace]);

// register listeners
// pubSub.addListener("message", player.onMessage);
inputManager.addListener("keydown", player.move);
