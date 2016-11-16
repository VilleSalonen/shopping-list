import angular from 'angular';
import angularMeteor from 'angular-meteor';
import shoppingList from "../imports/components/shoppingList/shoppingList";
import registration from "../imports/components/registration/registration";
import items from "../imports/components/items/items";
 
angular.module('shopping-list', [
  angularMeteor,
  shoppingList.name,
  registration.name,
  items.name
]);