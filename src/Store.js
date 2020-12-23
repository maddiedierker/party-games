function Store() {}

Store.uuid = {
  get: function (subscribeKey) {
    return localStorage.getItem(subscribeKey + "uuid");
  },
};

export default Store;
