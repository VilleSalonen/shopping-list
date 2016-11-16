import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { ShoppingList } from "../../api/shoppingItems.js";

import template from './shoppingList.html';
 
class ShoppingListCtrl {
    constructor($scope) {
        $scope.viewModel(this);
    
        this.helpers({
            shoppingItems() {
                return ShoppingList.find({ bought: false });
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
 
export default angular.module('shoppingList', [
    angularMeteor
]).component('shoppingList', {
    templateUrl: 'imports/components/shoppingList/shoppingList.html',
    controller: ['$scope', ShoppingListCtrl]
});