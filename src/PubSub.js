import PubSubImpl from "@src/PubSubImpl";

export default function PubSub(publishKey, subscribeKey) {
  return {
    ...new PubSubImpl(publishKey, subscribeKey),
  };
}
