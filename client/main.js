import angular from 'angular';
import angularMeteor from 'angular-meteor';
import shoppingList from "../imports/components/shoppingList/shoppingList";
 
angular.module('shopping-list', [
  angularMeteor,
  shoppingList.name
]);