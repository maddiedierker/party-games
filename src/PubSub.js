import PubSubImpl from "@src/PubSubImpl";

function PubSub(publishKey, subscribeKey) {
  const impl = new PubSubImpl(publishKey, subscribeKey);

  return {
    publish: impl.publish,
    subscribe: impl.subscribe,
    addListener: impl.addListener,
    uuid: impl.uuid,
  };
}

export default PubSub;
