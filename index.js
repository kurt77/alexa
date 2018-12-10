"use strict";

// Include the Alexa SDK
var Alexa = require("alexa-sdk");

// The handlers object tells Alexa how to handle various actions
var handlers = {
    //Our skill will receive a LaunchRequest when the user invokes the skill with the invocation name, but does not provide any command mapping to an intent. For example, open codecademy
    //quando usi un emit l handler terminera
    //se si usa il costrutto this.emit(":ask","prompt","repropmpt"), nel reprompt si puo riformulare la domanda nel caso l'utente non abbia capito
    "LaunchRequest": function () {
        this.emit(":tell", "Welcome to Codecademy"); // Create speech output. This is what Alexa will speak back when the user says "Open code academy"
    
    //un altro modo per far parlare alexa, è il costrutto response.speak - response ready
        this.response.speak('Benvenuto a Codeacademy').listen('puoi dire qualcosa del tipo...');
        this.emit(':responseReady')
    },
    "WelcomeIntent": function () {
      this.emit(":tell", "Hello, Codecademy"); // Calls the SayWelcomeMessage handler. This is what Alexa will speak back when the user says "Ask code academy to say hello"
    }
    "myFavouriteLanguageIntent": function(){
    this.emit(":tell","Hey Brandon, long time no talk, your favourite language is JavaScript. You're a noob! Bye.");
  },
    "getUserInput": function () {
        var input;
        input = this.event.request.sslots.[slot].value;
    }
};


// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
    // Create an instance of the Alexa library and pass it the requested command.
    var alexa = Alexa.handler(event, context);

    // Give our Alexa instance instructions for handling commands and execute the request.
    alexa.registerHandlers(handlers);
    alexa.execute();
};
