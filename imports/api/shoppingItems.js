import { Meteor } from 'meteor/meteor';
import { Mongo } from "meteor/mongo";
import { check } from 'meteor/check';

export const ShoppingList = new Mongo.Collection("shoppingList");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('shoppingList', function shoppingListPublication() {
        return ShoppingList.find({ owner: this.userId });
    });
}

Meteor.methods({
    "shoppingList.insert" (name, amount) {
        check(name, String);
        check(amount, Number);

        if (!Meteor.userId()) {
            throw new Meteor.error("not-authorized");
        }

        ShoppingList.insert({
            owner: Meteor.userId(),
            name: name,
            amount: amount,
            addedOn: new Date(),
            bought: false,
            boughtOn: undefined
        })
    },

    "shoppingList.markAsBought" (itemId) {
        if (!Meteor.userId()) {
            throw new Meteor.error("not-authorized");
        }

        ShoppingList.update(itemId, {
            $set: {
                bought: true,
                boughtOn: new Date()
            }
        });
    }
})