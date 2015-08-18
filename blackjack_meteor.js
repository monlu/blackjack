Counter = new Mongo.Collection("counter");
Chat = new Mongo.Collection("blackjack-chat");
Deck = new Mongo.Collection("blackjack-deck");
Hand = new Mongo.Collection('blackjack-hand');

function Game () {
  this.deck = [
    
  ]
}

if (Meteor.isClient) {

  Template.body.helpers({
    messages: function () {
      return Chat.find({});
    }
  });

  Template.body.events({
    "submit .message": function (event) {
      event.preventDefault();

      var text = event.target.text.value;
      console.log(text);

      Chat.insert({
        message: text,
        createdAt: new Date()
      });

      event.target.text.value = "";
    }
  });

  Template.hello.helpers({
    counter: function () {
      return Counter.findOne().count;
    }
  });

  Template.hello.events({
    'click button': function () {
      var number = Counter.findOne();
      // increment the counter when button is clicked
      Counter.update(number._id, { $set: { count: number.count + 1} });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Counter.remove({});
    Counter.insert({count: 0});
    // Chat.remove({})
    // code to run on server at startup
  });
}
