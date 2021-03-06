import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { ShoppingList } from "../../api/shoppingItems.js";

import template from './items.html';
 
class ItemsCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe('shoppingList');
    
        this.helpers({
            shoppingItems() {
                return ShoppingList.find({ bought: false });
            },

            boughtItems() {
                return ShoppingList.find({ bought: true }, {
                    sort: { boughtOn: -1 },
                    limit: 10
                });
            }
        })
    }

    addItem(newItemName, newItemAmount) {
        var amount = 1;
        if (newItemAmount) {
            amount = +newItemAmount;
        }

        Meteor.call("shoppingList.insert", newItemName, amount);

        this.newItemName = "";
        this.newItemAmount = "";

        $("#item-name").focus();
    }

    markAsBought(item) {
        Meteor.call("shoppingList.markAsBought", item._id);
    }
}
 
export default angular.module('items', [
    angularMeteor
]).component('items', {
    templateUrl: 'imports/components/items/items.html',
    controller: ['$scope', ItemsCtrl]
});