ShoppingList = new Meteor.Collection("shopping-list");

Template.shopping_list.items = function () {
    return ShoppingList.find();
};

Template.item_info.events({
  'click .remove': function () {
      ShoppingList.remove(this._id);
  }
});

Template.item_info.isNonDefaultAmount = function (value) {
    return value > 1;
};

Template.shopping_list.events({
  'click #item_add': function (event, template) {
      event.preventDefault();

      var itemName = template.find("input[name=item_name]").value;
      var itemAmount = template.find("input[name=item_amount]").value;

      ShoppingList.insert({ name: itemName, amount: itemAmount });

      template.find("input[name=item_name]").value = "";
      template.find("input[name=item_amount]").value = "1";
      template.find("input[name=item_name]").focus();
  }
});