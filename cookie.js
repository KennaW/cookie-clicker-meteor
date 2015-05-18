if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.set('grandma', 0);
  Session.set('cursor', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    grandma: function() {
      return Session.get('grandma');
    },
    cursor: function() {
      return Session.get('cursor');
    }
  });

//check for greater than
  Template.registerHelper('greaterThan',
    function(v1, v2) {
        return (v1 > v2);
    }
);

  Template.hello.events({
    'click #bigcookie': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },

    'click #cursor': function () {
      // increment the number of cursors owned
      Session.set('cursor', Session.get('cursor') +1);

      //pay up
      Session.set('counter', Session.get('counter') - 5);
    },

    'click #grandma': function(){
      //increase number of grandmas
      Session.set('grandma', Session.get('grandma') +1);
      //pay 5 cookies for grandma
      Session.set('counter', Session.get('counter') - 10);

    }
  });

  //for each cursor, add a cookie every 5 seconds
  Meteor.setInterval( function () {
      cursors=Session.get('cursor');
      Session.set('counter', Session.get('counter')+ cursors );
  }, 5000 );

  //for each grandma, add 5 cookies every 10 seconds
  Meteor.setInterval( function () {
      cursors=Session.get('cursor');
      Session.set('counter', Session.get('counter')+ (cursors * 5) );
  }, 10000 );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
