'use strict';

var Alexa = require('alexa-sdk');

//nota: struttura dati di tipo dictionary
var flashcardsDictionary = [
  {
    animale: 'gatto',
    verso: "<audio src='soundbank://soundlibrary/animals/amzn_sfx_cat_meow_1x_01'/>"
  },
  {
    animale: 'uccello',
    verso: "<audio src='soundbank://soundlibrary/animals/amzn_sfx_bird_chickadee_chirps_01'/>"
  },
  {
    animale:'pollo',
    verso: "<audio src='soundbank://soundlibrary/animals/amzn_sfx_chicken_cluck_01'/>"
  },
  {
    animale:'corvo',
    verso: "<audio src='soundbank://soundlibrary/animals/amzn_sfx_chicken_cluck_01'/>"
  },
  {
    animale:'cane',
    verso: "<audio src='soundbank://soundlibrary/animals/amzn_sfx_dog_med_bark_2x_02'/>"
  },
  {
    animale:'elefante',
    verso: "<audio src='soundbank://soundlibrary/animals/amzn_sfx_elephant_01'/>"
  },
  {
    animale:'cavallo',
    verso: "<audio src='soundbank://soundlibrary/animals/amzn_sfx_horse_huff_whinny_01'/>"
  }
];

//var versiAnimali = [
//    ["gatto","<audio src='soundbank://soundlibrary/animals/amzn_sfx_cat_meow_1x_01'/>"],
//    ["uccello","<audio src='soundbank://soundlibrary/animals/amzn_sfx_bird_chickadee_chirps_01'/>"],
//    ["pollo","<audio src='soundbank://soundlibrary/animals/amzn_sfx_chicken_cluck_01'/>"],
//    ["corvo","<audio src='soundbank://soundlibrary/animals/amzn_sfx_crow_caw_1x_01'/>"],
//    ["cane","<audio src='soundbank://soundlibrary/animals/amzn_sfx_dog_med_bark_2x_02'/>"],    
//    ["elefante","<audio src='soundbank://soundlibrary/animals/amzn_sfx_elephant_01'/>"],
//    ["cavallo","<audio src='soundbank://soundlibrary/animals/amzn_sfx_horse_huff_whinny_01'/>"]
//    ];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {

  // Open Codecademy Flashcards
  'LaunchRequest': function() {
    //NOTA: nella LaunchRequest inizializzo gli stati
    //this.attributes['language'] = '';
    this.attributes['numberCorrect'] = 0;
    this.attributes['questionCounter'] = 0;
    this.attributes['randomIndex'] = 0;
    
    //esempio di listen con reprompt
    this.response
        .listen('Benvenuto a allegra fattoria. Farò il verso di un animale e tu dovrai indovinare quale animale è. Sei pronto?').speak(
        'Sei pronto a indovinare un animale dal verso?');
    this.emit(':responseReady');
  },
  
  //imposto il linguaggio e faccio la prima domanda
  /*
  'SetMyLanguageIntent': function() {
    //imposto lo stato language con lo slot languages pronunciato dall'utente
    this.attributes['language'] = this.event.request.intent.slots.languages.value;

    if (this.attributes['language'] === 'JavaScript') {
      this.attributes['language'] = 'javascript';  //non chiaro
    }
    
    //assegno alla variabile language lo stato corrente dell'attributo language
    var language = this.attributes['language'];
    
    //NB: in questa risposta vado a invocare un altro intent passandogli uno stato
    this.response
      .speak('Okay, I will ask you some questions about ' +
        language + '. Here is your first question. ' + 
        AskQuestion(this.attributes))
      .listen(AskQuestion(this.attributes));

    this.emit(':responseReady');
  },
*/
  
  //intent invocato quando l'utente dice sono pronto (oppure si, verificare le utterances)
  'readyIntent': function(){
    this.response.speak('Va bene, indovina questo verso ' + AskQuestion()).listen();

    this.emit(':responseReady');
    
   } 
  
  
  
  // User gives an answer
  // verifico la risposta dell utente
  'AnswerIntent': function() {
    var userAnswer = this.event.request.intent.slots.answer.value;
    var language = this.attributes['language'];
    var languageAnswer = language + 'Answer';
    var currentFlashcardIndex = this.attributes['currentFlashcardIndex'];
    var correctAnswer = flashcardsDictionary[currentFlashcardIndex][languageAnswer];

    if (userAnswer === correctAnswer){
      this.attributes['numberCorrect']++;
      var numberCorrect = this.attributes['numberCorrect'];
      this.attributes['currentFlashcardIndex']++;
      this.response
        .speak('Nice job! The correct answer is ' + correctAnswer + '. You ' +
          'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH + ' ' +
          language + ' questions correct. Here is your next question. ' + AskQuestion(this.attributes))
        .listen(AskQuestion(this.attributes));
    } else {
      var numberCorrect = this.attributes['numberCorrect'];
      this.attributes['currentFlashcardIndex']++;
      this.response
        .speak('Sorry, the correct answer is ' + correctAnswer + '. You ' +
          'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH + ' ' +
          language + ' questions correct. Here is your next question. ' + 
          AskQuestion(this.attributes))
        .listen(AskQuestion(this.attributes));
    }

    this.emit(':responseReady');
  },

  // Stop
  'AMAZON.StopIntent': function() {
    this.response.speak('Ok, let\'s play again soon.');
    this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
    this.response.speak('Ok, let\'s play again soon.');
    this.emit(':responseReady');
  }


};

// Test my {language} knowledge
//verifico che ci siano delle domande rimanenti. In caso positivo genera un altra domanda
var AskQuestion = function() {
  //var language = attributes['language'];
  //this.attributes['questionCounter'] = 0;
  //this.attributes['randomIndex'] = 0;
  var questionCounter = attributes['questionCounter'];
  var randomIndex = Math.floor(Math.random() * DECK_LENGTH);

  if (questionCounter >= DECK_LENGTH) {
    return 'Mi dispiace, ho finito le domande';
  } else {
    //da modificare per fare ritornare un animale random
    var currentQuestion = flashcardsDictionary[randomIndex].verso;
    
    return  currentQuestion;
  }
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};


function randomPhrase(myData) {
  // the argument is an array [] of words or phrases
  var i = 0;
  i = Math.floor(Math.random() * myData.length);
  return(myData[i]);
}
