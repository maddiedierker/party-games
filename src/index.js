import env from "/.env";
import PubSub from "@src/PubSub";
import InputManager from "@src/InputManager";
import Player from "@src/Player";
import PartyGoersController from "@src/PartyGoersController";
import Playspace from "@src/UIElements/Playspace";
import UI from "@src/UI";

if (!env) {
  throw new Error("env object is required");
}

// initialize everyone
const pubSub = new PubSub(env.pubPublishKey, env.pubSubscribeKey);
const inputManager = new InputManager();
const player = new Player(10, 10, pubSub);
const partyGoersController = new PartyGoersController();
const playspace = new Playspace(player, partyGoersController);
new UI("app", [playspace]);

console.log(pubSub.uuid, "-- it me");

// register listeners
pubSub.addListener("message", partyGoersController.onMessage);
inputManager.addListener("keydown", player.move);
