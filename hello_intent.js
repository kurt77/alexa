"use strict";

// Include the Alexa SDK
var Alexa = require("alexa-sdk");

// The handlers object tells Alexa how to handle various actions
var handlers = {
  "HelloIntent": function () {
	//Create speech output. This is what Alexa will speak back when the user says "Ask code academy to say hello"
	this.response.speak("Hello, Codecademy");
      	this.emit(":responseReady");
	 
	//un modo equivalente di far pronunciare una stringa a Alexa è il seguente
	//this.emit(':tell','Hello, Codecademy');
	  
	//se volessi fare una domanda (il terzo parametro,facoltativo,è il reprompt, pronunciato nel caso non si ottenga risposta al primo tentativo)
	//this.emit(':ask','ciao come ti chiami','ho chiesto come ti chiami');	  
   },
  //Our skill will receive a LaunchRequest when the user invokes the skill with the invocation name, but does not provide any command mapping to an intent. For example, "Open code academy"
  "LaunchRequest": function () {
    this.response.speak("Welcome to Codecademy"); 
    this.emit(":responseReady");
   }

};


// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {

  // Set up the Alexa object
	var alexa = Alexa.handler(event,context);
  
  // Register Handlers
  alexa.registerHandlers(handlers);

  // Start our Alexa code
  alexa.execute();
};
