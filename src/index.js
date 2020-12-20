import env from "/.env";
if (!env) {
  throw new Error("env object is required");
}

import PubSub from "@src/PubSub";

const pubSub = new PubSub(env.pubPublishKey, env.pubSubscribeKey);
pubSub.publish();
pubSub.subscribe();
