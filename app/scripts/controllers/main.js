'use strict';

/**
 * @ngdoc function
 * @name angularFluxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFluxApp
 */
angular.module('angularFluxApp')
  .controller('MainCtrl', function($scope, CartActions, CartStore) {
  var vm = this;
  
  vm.catalogItems = [
    {id: 1, title: 'Angular Connect Ticket (Round 1)', cost: 550},
    {id: 2, title: 'Workshop: Intro to Angular 2 (with John Lindquist)', cost: 300},
    {id: 3, title: 'Workshop: Preparing to Upgrade to Angular 2', cost: 300}
  ];
  vm.cartItems = [];
  vm.addItem = addItem;
  vm.removeItem = removeItem;
  
  // register callback
  CartStore.event.on('change', cartUpdated);
  
  // deregister on $destroy
  $scope.$on('$destroy', function(){
    CartStore.event.removeListener(cartUpdated);
  });
  
  // helper functions
  function addItem(item){
    CartActions.addItem(angular.copy(item));
  }
  
  function removeItem(item){
    CartActions.removeItem(item);
  }
  
  function cartUpdated(){
    vm.cartItems = CartStore.getItems();
    vm.total = vm.cartItems.reduce(function(last, item){
      return last + (item.qty*item.data.cost);
    }, 0);
  }
});
