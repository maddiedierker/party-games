import PubSubImpl from "@src/PubSubImpl";

export default function PubSub(publishKey, subscribeKey) {
  const impl = new PubSubImpl(publishKey, subscribeKey);

  return {
    publish: impl.publish,
    subscribe: impl.subscribe,
    addListener: impl.addListener,
    uuid: impl.uuid,
  };
}
