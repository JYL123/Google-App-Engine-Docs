//This is JS code is not meant to run locally. It should be test on Cloud Function.
const ApiAiApp = require('actions-on-google').ApiAiApp;
var Filter = require('bad-words');
var natural = require('natural');
const NLP = require('google-nlp')

var userInput = "";
let score = 0;

//This is an example 
function parade(app) {
  app.ask(`Chinese New Year Parade in Chinatown from 6pm to 9pm.`);
  }
exports.parades = function(request, response) {
    var app = new ApiAiApp({request: request, response: response});
    var actionMap = new Map();
    actionMap.set("inquiry.parades", parade);
    app.handleRequest(actionMap);
};
//Filter and get the bad words
function badwordsFilter(app) {
    filter = new Filter();
    let isBadwords = false;
    let cleanBadwords = filter.clean(userInput);
    if(userInput != cleanBadwords) {
        //filtered by "bad-words" so we are certain that this sentence contains extrem bad words.
        isBadwords = true;
    } 
  
  	console.log("does the sentence contain bad words? " + isBadwords); 
	console.log("This is the bad words: " + getDifference(userInput, cleanBadwords));
  
    if(isBadwords) app.ask("We detected a bad word" );
    else app.ask("Thanks for your feedback" );
}
exports.filters = function(request, response) {  
    var app = new ApiAiApp({request: request, response: response});
    var actionMap = new Map();
    actionMap.set("inquiry.filters", badwordsFilter);
    userInput = request.body.result.resolvedQuery;
    app.handleRequest(actionMap);
};

//Filter and get good words
function goodwordsFilter(app) {
	var filterGood = new Filter({ emptyList: true }); 
	filterGood.addWords(['nice', 'greate', 'awesome', 'brilliant', 'clean']);
	let isGoodwords = false;
	//let aSentenceWithGoodwords = "Food is nice and clean";
	let cleanGoodwords = filterGood.clean(userInput)
	if(userInput != cleanGoodwords) {
    	//filtered by "good-words" so we are certain that this sentence contains extrem bad words.
    	isGoodwords = true;
	}
  
  	console.log("does the sentence contain bad words? " + isBadwords); 
	console.log("This is the bad words: " + getDifference(userInput, cleanBadwords));
  
  	app.ask("Thanks for your feedback" );	
}
exports.filters_goodwords = function(request, response) {  
    var app = new ApiAiApp({request: request, response: response});
    var actionMap = new Map();
    actionMap.set("inquiry.filters_goodwords", goodwordsFilter);
    userInput = request.body.result.resolvedQuery;
    app.handleRequest(actionMap);
};

//Tokenize a sentence to get its components 
function tokenizer(app){
	var tokenizeWords= new natural.WordTokenizer();
	app.ask(tokenizeWords.tokenize(userInput).toString());
}
exports.tokenizeInput = function(request, response) {  
    var app = new ApiAiApp({request: request, response: response});
    var actionMap = new Map();
    actionMap.set("inquiry.tokenizeInput", tokenizer);
    userInput = request.body.result.resolvedQuery;
    app.handleRequest(actionMap);
};

function getSentiment(app) {
    const apiKey = 'AIzaSyBw_8URsgJLwf2MwJhzBinBZZd_0zuUkus';
    let text = 'This chicken is so dry.';
    let nlp = new NLP( apiKey );

    /**
     *  Analyze entities from the text string
     */
    nlp.analyzeEntities( text )
    .then(function( entities ) {
        // 	Output returned entities
        console.log( 'Entities:', JSON.stringify(entities) );
    })
    .catch(function( error ) {
        // 	Error received, output the error
        console.log( 'Error:', error.message );
    })

    /**
     *  Analyze sentiment from the text string
     */
    nlp.analyzeSentiment( text )
    .then(function( sentiment ) {
        score = sentiment["documentSentiment"].score;
        console.log( 'Sentiment:', sentiment["documentSentiment"].score );
    })
    .catch(function( error ) {
        console.log( 'Error:', error.message );
    })

    if(score <= 0) app.ask("The score is " + score + " F.")
  	else if (score >= 2) app.ask("The score is " + score + " A.")
  	else app.ask("The rating is unknown.")
}
exports.getUserSentiment = function(request, response) {  
    var app = new ApiAiApp({request: request, response: response});
    var actionMap = new Map();
    actionMap.set("inquiry.getUserSentiment", getSentiment);
    userInput = request.body.result.resolvedQuery;
    app.handleRequest(actionMap);
};

//Helper method
//assuming "a" contains the bad word/bad words
//"b" is the word/words purifed by the lib
function getDifference(a, b)
{
    if(a.length != b.length) return "something went wrong with the string";
    
    var j = 0;
    var result = "";
    var isLastwordBad = false;

    while (j < a.length)
    {
        if (a[j] != b[j]) {
            if(isLastwordBad) {
                isLastwordBad = true;
            } else {
                result = result + " ";
                isLastwordBad = true;
            }
            result += a[j];
        } else {
            isLastwordBad = false; 
        }
        j++;
    }
    return result;
}

//Helper method
//assuming "a" contains the bad word/bad words
//"b" is the word/words purifed by the lib
function getDifference(a, b)
{
    if(a.length != b.length) return "something went wrong with the string";
    
    var j = 0;
    var result = "";
    var isLastwordBad = false;

    while (j < a.length)
    {
        if (a[j] != b[j]) {
            if(isLastwordBad) {
                isLastwordBad = true;
            } else {
                result = result + " ";
                isLastwordBad = true;
            }
            result += a[j];
        } else {
            isLastwordBad = false; 
        }
        j++;
    }
    return result;
}

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.helloWorld = function helloWorld(req, res) {
  // Example input: {"message": "Hello!"}
  if (req.body.message === undefined) {
    // This is an error case, as "message" is required.
    res.status(400).send('No message defined!');
  } else {
    // Everything is okay.
    console.log(req.body.message);
    res.status(200).send('Success: ' + req.body.message);
  }
};