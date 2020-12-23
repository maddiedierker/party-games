import env from "/.env";
import PubSub from "@src/PubSub";
import WindowManager from "@src/WindowManager";
import Player from "@src/Player";
import PartyGoersController from "@src/PartyGoersController";
import Playspace from "@src/UIElements/Playspace";
import UI from "@src/UI";
import utils from "@src/utils";
import Store from "@src/Store";

if (!env) utils.throwError("env object is required");

// initialize everyone
const windowManager = new WindowManager();
const pubSub = new PubSub(env.pubPublishKey, env.pubSubscribeKey);
const player = new Player(10, 10, pubSub);
window.player = player;
const partyGoersController = new PartyGoersController(pubSub);
const playspace = new Playspace(player, partyGoersController);
new UI("app", [playspace]);

console.log(pubSub.uuid, "-- it me");

// pubsub listeners
pubSub.addListener("message", partyGoersController.onMessage);
pubSub.addListener("message", player.onMessage);

// input listeners
windowManager.addEventListener("keydown", player.move);
windowManager.addUnloadCallback(player.onLeave);
