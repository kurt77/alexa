"use strict";

// Include the Alexa SDK
var Alexa = require("alexa-sdk");

// The handlers object tells Alexa how to handle various actions
var handlers = {
    //Our skill will receive a LaunchRequest when the user invokes the skill with the invocation name, but does not provide any command mapping to an intent. For example, open codecademy
    "LaunchRequest": function () {
      this.emit(":tell", "Welcome to Codecademy"); // Create speech output. This is what Alexa will speak back when the user says "Open code academy"
    },
    "WelcomeIntent": function () {
      this.emit(":tell", "Hello, Codecademy"); // Calls the SayWelcomeMessage handler. This is what Alexa will speak back when the user says "Ask code academy to say hello"
    }
  "myFavouriteLanguageIntent": function(){
    this.emit(":tell","Hey Brandon, long time no talk, your favourite language is JavaScript. You're a noob! Bye.");
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
