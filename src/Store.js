function Store() {}

Store.uuid = {
  get: function (subscribeKey) {
    localStorage.getItem(subscribeKey + "uuid");
  },
};

export default Store;
