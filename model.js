ShoppingList = new Meteor.Collection("shoppingList");

ShoppingList.allow({
  insert: function (userId, shoppingItem) {
    shoppingItem.owner = userId;
    
    return userId;
  },
  
  remove: function (userId, shoppingItem) {
    return shoppingItem.owner === userId;
  }
});
