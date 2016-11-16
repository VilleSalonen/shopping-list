import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { ShoppingList } from "../../api/shoppingItems.js";

import template from './shoppingList.html';
 
class ShoppingListCtrl {
    constructor($scope) {
        $scope.viewModel(this);
    
        this.helpers({
            currentUser() {
                return Meteor.user();
            }
        })
    }

    logout() {
        Meteor.logout();
    }
}
 
export default angular.module('shoppingList', [
    angularMeteor
]).component('shoppingList', {
    templateUrl: 'imports/components/shoppingList/shoppingList.html',
    controller: ['$scope', ShoppingListCtrl]
});