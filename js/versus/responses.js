/*******************************************************/
// Meteor JS sample code by James Hatfield
// This file sets up the major components of a Meteor JS feature
// There is a collection, a validation schema, a fixture for testing purposes, 
// a method to upsert data into the collection, basic allow/deny rules around inserting and removing records
// and finally a publish of the records back to the client with a filter to only send the current visitors records.
// This is not how these blocks of code are typically organized but has been consolidated for review purpose
/*******************************************************/


/*********** This creates a Mongo collection **********/

Responses = new Mongo.Collection('responses');


/*********** This creates a validation schema for the collection using SimpleSchema package**********/


App.Schemas.Response = new SimpleSchema({
    "visitorId": {
      type: String
    },
    "challengeId": {
      type: String
    },
    "optionIndex": {
      type: Number
    },
    "date": {
      type: String
    }
});

Responses.attachSchema(App.Schemas.Response);


/*********** this pushes fixture data for testing **********/

Meteor.startup(function () {

if (Responses.find().count() < 1) {
  //if no responses in the system, generate some
  var dummyVisitorCount = 300;
  var challenges = Challenges.find({}).fetch();
  //Challenges is an existing collection of documents that is the subject of the 'response' feature.
  var visitorsArray = [];
  // create array to hold visitor objects

    for (var i = 0; i < dummyVisitorCount; i++){
      visitorsArray.push(Random.id());
    }

    _.each(visitorsArray, function(visitor){

      //use vistor objects to generate unique challenge response entries using random coinflips 
      //and random time series data within the 7 day challenge window based on the challenge startdate.
      
      _.each(challenges, function(challenge){
        var response = {};
        response.visitorId = visitor;
        response.challengeId = challenge.challengeId;
        response.optionIndex = Math.floor((Math.random()*2)+1);//.toString();
        var randomdays = Math.floor((Math.random()*7));
        response.date = moment(challenge.startDate).add(randomdays, 'days').toDate();
        Responses.insert(response);
          });
    });
}
});


/*****************************************************************************/
/* Client and Server Methods */
/* Don't put senstive code in this file e.g. anything that the current user should not see */

/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   *  if (this.isSimulation) {
   *    // do some client stuff while waiting for
   *    // result from server.
   *    return;
   *  }
   *
   *  // server method logic
   * }
   */

   'challenge/respond': function (response) {
      /*
      var response = {
         "visitorId": visitorId,
         "challengeId": this.challengeId,
         "optionIndex": this.optionIndex
      };
      */
      var entry = Responses.upsert({'visitorId': response.visitorId, 'challengeId': response.challengeId}, {
         $set: {
            "visitorId": response.visitorId,
            "challengeId": response.challengeId,
            "optionIndex": response.optionIndex,
            "date": new Date()
            }
         });

      return entry;
   }

   
});


if(Meteor._isServer){

/*
This is where client side security is handled. 
However do not rely on this to prevent access to data that has been published. 
You must sanitize your published recored sets instead.
 */
Responses.allow({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function (userId, doc) {
    return true;
  }
});

Responses.deny({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});

}

/*
Here we are only publishing the records created by the current visitor
*/

Meteor.publish("responses", function(visitorId){
return Responses.find({"visitorId": visitorId});
})



