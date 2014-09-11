ShoppingList = new Meteor.Collection("shoppingList");

ShoppingList.allow({
  insert: function (userId, shoppingItem) {
    shoppingItem.owner = userId;
    shoppingItem.addedOn = new Date();
    shoppingItem.bought = false;
    shoppingItem.boughtOn = undefined;
    
    return userId;
  },
  
  remove: function (userId, shoppingItem) {
    // Shopping list items should only be marked as bought but never removed.
    return false;
  }
});

Meteor.methods({
  markAsBought: function (id) {
    ShoppingList.update({ _id: id, owner: Meteor.userId() }, { $set: { bought: true }});
    return id;
  }  
});
