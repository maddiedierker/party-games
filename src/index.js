import env from "/.env";
import PubSub from "@src/PubSub";
import WindowManager from "@src/WindowManager";
import Player from "@src/Player";
import Playspace from "@src/UIElements/Playspace";
import UI from "@src/UI";
import utils from "@src/utils";
import Room from "@src/Room";

if (!env) utils.throwError("env object is required");

// initialize everyone
const windowManager = new WindowManager();
const pubSub = new PubSub(env.pubPublishKey, env.pubSubscribeKey);
const player = new Player(10, 10);
const room = new Room("main", player, pubSub);
const playspace = new Playspace(room);
new UI("app", [playspace]);

// pubsub listeners
pubSub.addListener("presence", room.onPresence);

// input listeners
windowManager.addEventListener("keydown", player.move);

// debug stuff
window.player = player;
window.room = room;
console.log(pubSub.uuid, "-- it me");
