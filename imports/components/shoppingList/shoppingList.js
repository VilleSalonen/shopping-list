import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './shoppingList.html';
 
class ShoppingListCtrl {
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }
}
 
export default angular.module('shoppingList', [
  angularMeteor
])
  .component('shoppingList', {
    templateUrl: 'imports/components/shoppingList/shoppingList.html',
    controller: ShoppingListCtrl
  });