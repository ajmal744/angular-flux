angular.module('angularFluxApp')
.factory("Actions", function () {
  var options = {
    CART_ADD_ITEM: "CART_ADD_ITEM",
    CART_REMOVE_ITEM: "CART_REMOVE_ITEM"
  };
  return options;
});