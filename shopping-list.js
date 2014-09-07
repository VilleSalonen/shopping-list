ShoppingList = new Meteor.Collection("shopping-list");

if (Meteor.isClient) {
  Template.shopping_list.items = function () {
      return ShoppingList.find();
  };

  Template.item_info.events({
      'click .remove': function () {
          ShoppingList.remove(this._id);
      }
  });

  Template.shopping_list.events({
      'click #item_add': function (event, template) {
          var itemName = template.find("input[name=item_name]").value;
          var itemAmount = template.find("input[name=item_amount]").value;

          ShoppingList.insert({ name: itemName, amount: itemAmount });
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
