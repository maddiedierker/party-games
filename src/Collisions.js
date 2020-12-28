let _instance;

if (!_instance) {
  _instance = new Collisions();
}

function Collisions() {
  let _colliders = [];

  function _registerCollider(collider) {
    _colliders.push(collider);
  }

  return {
    registerCollider: _registerCollider,
    getColliders: function () {
      return _colliders;
    },
  };
}

export default _instance;
