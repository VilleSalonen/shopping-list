import angular from 'angular';
import angularMeteor from 'angular-meteor';
import shoppingList from "../imports/components/shoppingList/shoppingList";
import registration from "../imports/components/registration/registration";
 
angular.module('shopping-list', [
  angularMeteor,
  shoppingList.name,
  registration.name
]);