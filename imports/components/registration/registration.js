import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './registration.html';
 
class RegistrationCtrl {
    constructor($scope) {
        $scope.viewModel(this);
    }

    addUser(newUsername, newPassword, newEmail) {
        Accounts.createUser({ username: newUsername, email: newEmail, password: newPassword }, function(err) {
            if (err) {
                alert(err);
            }
        });

        this.newUsername = "";
        this.newPassword = "";
        this.newEmail = "";
    }

    login(username, password) {
        Meteor.loginWithPassword(username, password, function(err) {
            if (err)
                alert(err);
        });
    }
}
 
export default angular.module('registration', [
    angularMeteor
]).component('registration', {
    templateUrl: 'imports/components/registration/registration.html',
    controller: ['$scope', RegistrationCtrl]
});