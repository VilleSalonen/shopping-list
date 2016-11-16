import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { ShoppingList } from "../../api/shoppingItems.js";

import template from './items.html';
 
class ItemsCtrl {
    constructor($scope) {
        $scope.viewModel(this);
    
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
        ShoppingList.insert({
            name: newItemName,
            amount: newItemAmount,
            addedOn: new Date(),
            bought: false,
            boughtOn: undefined
        })

        this.newItemName = "";
        this.newItemAmount = "";
    }

    markAsBought(item) {
        ShoppingList.update(item._id, {
            $set: {
                bought: true,
                boughtOn: new Date()
            }
        });
    }
}
 
export default angular.module('items', [
    angularMeteor
]).component('items', {
    templateUrl: 'imports/components/items/items.html',
    controller: ['$scope', ItemsCtrl]
});