Meteor.startup(function () {
  Meteor.publish("shoppingList", function () {
    return ShoppingList.find(
      { owner: this.userId });
  });
});
