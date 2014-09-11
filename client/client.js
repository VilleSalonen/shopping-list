Meteor.subscribe("shoppingList");

Handlebars.registerHelper('isLoggedIn', function () {
    var user = Meteor.user();
    return !_.isUndefined(user) && !_.isNull(user);
});

Handlebars.registerHelper('isNonDefaultAmount', function (value) {
    return value > 1;
});

Template.history.items = function () {
    return ShoppingList.find({ bought: true }, { sort: { boughtOn: -1 }, limit: 10 });
};

Template.shopping_list.items = function () {
    return ShoppingList.find({ bought: false });
};

Template.loggedInMenu.username = function () {
  var user = Meteor.user();
  if (!user) { return ""; }

  return Meteor.user().username;
};

Template.item_info.events({
  'click .remove': function () {
    Meteor.call("markAsBought", this._id);
  }
});

Template.registration.events({
  'submit #registration-form': function(e, t) {
    e.preventDefault();
    
    // retrieve the input field values
    var email = t.find('#registration-email').value
    , password = t.find('#registration-password').value
    , username = t.find('#registration-name').value;

    Accounts.createUser({ username: username, email: email, password: password }, function(err) {
      if (err)
        alert(err);
    });
    
    // Prevent form submission
    return false; 
  },
});

Template.shopping_list.events({
  'click #item_add': function (event, template) {
      event.preventDefault();

      var itemName = template.find("input[name=item_name]").value;
      var itemAmount = template.find("input[name=item_amount]").value;

      ShoppingList.insert({ name: itemName, amount: itemAmount });

      template.find("input[name=item_name]").value = "";
      template.find("input[name=item_amount]").value = "";
      template.find("input[name=item_name]").focus();
  }
});

Template.login.events({
  'submit #login-form': function(e, t) {
    e.preventDefault();
    
    // retrieve the input field values
    var email = t.find('#login-email').value
    , password = t.find('#login-password').value;

    Meteor.loginWithPassword(email, password, function(err) {
      if (err)
        alert(err);
    });
    
    // Prevent form submission
    return false; 
  },
});

Template.loggedInMenu.events({
  'click .logout': function (e, t) {
    Meteor.logout();
  },
});
