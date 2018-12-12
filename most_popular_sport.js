"use strict";

var Alexa = require("alexa-sdk");

var handlers = {
  'LaunchRequest': function() {
    this.respose.speak("Hello, what do you think is the world's most popular sport?").listen("Tell me what you think is the world's most popular sport");
    this.emit(':responseReady');
    
  },

  'MostPopularSportIntent': function () {
    //raccolgo nella variabile worldSport lo slot sport pronunciato dall'utente
    var worldSport = this.event.request.intent.slots.sport.value;
    if(worldSport === "soccer"){
      this.emit(:tell,"Correct! Soccer is the world's most popular sport.");
      
    }else{
      this.emit(:tell,"You guessed that " + worldSport + "is the most popular.. Actually, soccer is the world's most popular sport")
      
    }
  },
}

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
