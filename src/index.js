import env from "/.env";
import utils from "@src/utils";
if (!env) utils.throwError("env object is required");

import WindowManager from "@src/WindowManager";
import PubSub from "@src/PubSub";
import Player from "@src/Player";
import Room from "@src/Room";
import Playspace from "@src/UIElements/Playspace";
import UI from "@src/UI";
import Settings from "@src/Settings";

// initialize everyone
const windowManager = new WindowManager();
const pubSub = new PubSub(env.pubPublishKey, env.pubSubscribeKey);
const player = new Player();
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
window.settings = Settings;
console.log(pubSub.uuid, "-- it me");
