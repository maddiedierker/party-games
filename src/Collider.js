import CollidersController from "@src/CollidersController";
import utils from "@src/utils";

export const ColliderType = {
  player: "player",
  partyGoer: "partygoer",
};

export default function Collider(id, type, getPoints) {
  const t = utils.type(this);
  if (!id) utils.throwStartupError(t, "id is required");
  if (!getPoints || typeof getPoints !== "function")
    utils.throwStartupError(t, "getPoints is a required function");

  /////////////////////////////////////////////////////////////
  ////// API METHODS
  /////////////////////////////////////////////////////////////
  function _getCollisions(points) {
    let _collisions = [];
    CollidersController.getColliders().forEach(function (_collider) {
      if (_collider.id === id) return;
      let colliding = false;
      _collider.getPoints().forEach(function (point) {
        if (utils.withinSquare(point, points)) colliding = true;
      });

      // TODO: insertion sort closest-to-farthest
      if (colliding) _collisions.push(_collider);
    });

    return _collisions;
  }

  const _this = {
    id,
    type,
    getPoints,
    getCollisions: _getCollisions,
  };
  CollidersController.registerCollider(_this);
  return _this;
}
