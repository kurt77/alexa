'use strict';

var Alexa = require('alexa-sdk');

//nota: struttura dati di tipo dictionary
var flashcardsDictionary = [
  {
    question: 'How do you find the length of a string?',
    rubyAnswer: 'length',
    pythonAnswer: 'len',
    javascriptAnswer: 'length'
  },
  {
    question: 'How do you print to the console or terminal?',
    rubyAnswer: 'puts',
    pythonAnswer: 'print',
    javascriptAnswer:'console.log'
  },
  {
    question:'Are the boolean terms true and false capitalized or lowercase?',
    rubyAnswer: 'lowercase',
    pythonAnswer: 'capitalized',
    javascriptAnswer: 'lowercase'
  }];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {

  // Open Codecademy Flashcards
  'LaunchRequest': function() {
    //NOTA: nella LaunchRequest inizializzo gli stati
    this.attributes['language'] = '';
    this.attributes['numberCorrect'] = 0;
    this.attributes['currentFlashcardIndex'] = 0;
    
    //esempio di listen con reprompt
    this.response
        .listen('Welcome to Flashcards. In this session, do you want to test' +
        ' your knowledge in Ruby, Python, or Javascript?').speak(
        'Which language would you like to practice?');
    this.emit(':responseReady');
  },
  
  //imposto il linguaggio e faccio la prima domanda
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
var AskQuestion = function(attributes) {
  var language = attributes['language'];
  var currentFlashcardIndex = attributes['currentFlashcardIndex'];

  if (currentFlashcardIndex >= flashcardsDictionary.length) {
    return 'No questions remaining';
  } else {
    var currentQuestion = flashcardsDictionary[currentFlashcardIndex].question;
    return 'In ' + language + ', ' + currentQuestion;
  }
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

