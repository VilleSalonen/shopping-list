import { Meteor } from 'meteor/meteor';
import { Mongo } from "meteor/mongo";
import { check } from 'meteor/check';

export const ShoppingList = new Mongo.Collection("shoppingList");

Meteor.methods({
    "shoppingList.insert" (name, amount) {
        check(name, String);
        check(amount, Number);

        if (isNan(amount)) {
            throw new Meteor.error("not-a-number");
        }

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