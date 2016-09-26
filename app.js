(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingController', ShoppingController)
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService)
//.config(Config);
// .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)

// Config.$inject = ['ShoppingListServiceProvider'];
// function Config() {
// }


ShoppingController.$inject = ['$scope','ShoppingListCheckOffService'];
function ShoppingController($scope, ShoppingListCheckOffService) {
  var list = this;
  const noBuyMsg = 'Everything is bought!';
  const noBoughtMsg = 'Nothing bought yet';
  list.boughtMessage = noBoughtMsg;
  $scope.showMsg = function () {
    if (ShoppingListCheckOffService.getBoughtItems().length == 0) {
      list.boughtMessage = noBoughtMsg;
    } else {
      list.boughtMessage = '';
    }
    if (ShoppingListCheckOffService.getBuyItems().length == 0) {
      list.toBuyMessage= noBuyMsg;
    } else {
      list.toBuyMessage= ' ';
    }
  };
}



ToBuyShoppingController.$inject = ['$scope','ShoppingListCheckOffService'];
function ToBuyShoppingController($scope, ShoppingListCheckOffService) {
  var list = this;
  list.items = ShoppingListCheckOffService.getDefaultToBuyItems();
  list.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeBuyItem(itemIndex);
    $scope.showMsg();
  };
}

AlreadyBoughtShoppingController.$inject = ['$scope','ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {
  var list = this;
  list.items = ShoppingListCheckOffService.getBoughtItems();
  list.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeBoughtItem(itemIndex);
    $scope.showMsg();
  };
}




// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var boughtItems = [];

  var defaultToBuyItems = [
                            { name: "Kiwis", quantity: 30 },
                            { name: "Pappaya", quantity: 20 },
                            { name: "Promogranate", quantity: 10 },
                            { name: "Grapes", quantity: 15 },
                            { name: "Oranges", quantity: 50 }                          ];

  var toBuyItems = defaultToBuyItems;

  service.addBuyItem = function (itemName, quantity) {
    // if ((maxItems === undefined) ||
    //     (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      toBuyItems.push(item);
    // }
    // else {
    //   throw new Error("Max items (" + maxItems + ") reached.");
    // }
  };

  service.removeBuyItem = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getBuyItems = function () {
    return toBuyItems;
  };
  service.getDefaultToBuyItems = function () {
    return defaultToBuyItems;
  };



  service.addBoughtItem = function (itemName, quantity) {
    // if ((maxItems === undefined) ||
    //     (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      boughtItems.push(item);
    // }
    // else {
    //   throw new Error("Max items (" + maxItems + ") reached.");
    // }
  };

  service.removeBoughtItem = function (itemIndex) {
    toBuyItems.push(boughtItems[itemIndex]);
    boughtItems.splice(itemIndex, 1);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

}


// function ShoppingListCheckOffServiceProvider() {
//   var provider = this;
//
//   provider.defaults = {
//     maxItems: 10
//   };
//
//   provider.$get = function () {
//     var shoppingList = new ShoppingListCheckOffService(provider.defaults.maxItems);
//
//     return shoppingList;
//   };
// }

})();
