/*
 * This is the algorithm that can do natrual language processing on sentences to pick up the seniments of it,
 * and can retrive the subjects of the sentences and its the comments of the subjects in input sentences.
 */
var Filter = require('bad-words');
var natural = require('natural');
const NLP = require('google-nlp');
var speak = require("speakeasy-nlp");

//filter bad words
filter = new Filter();
let isBadwords = false;
let aSentenceWithBadwords = "hell, Don't be an ash0le"
let cleanBadwords = filter.clean(aSentenceWithBadwords);
if(aSentenceWithBadwords != cleanBadwords) {
    //filtered by "bad-words" so we are certain that this sentence contains extrem bad words.
    isBadwords = true;
} 
console.log("does the sentence contain bad words? " + isBadwords); 
console.log("This is the bad words: " + getDifference(aSentenceWithBadwords, cleanBadwords));

//filter good words
var filterGood = new Filter({ emptyList: true }); 
filterGood.addWords(['nice', 'greate', 'awesome', 'brilliant', 'clean']);
let isGoodwords = false;
let aSentenceWithGoodwords = "Food is nice and clean";
let cleanGoodwords = filterGood.clean(aSentenceWithGoodwords)
if(aSentenceWithGoodwords != cleanGoodwords) {
    //filtered by "bad-words" so we are certain that this sentence contains extrem bad words.
    isGoodwords = true;
} 
console.log("does the sentence contain good words? " + isGoodwords); 
console.log("This is the good words: " + getDifference(aSentenceWithGoodwords, cleanGoodwords));


//To get the key words that determines the sentiment 
//This lib can be used within each loop after google entity analyse.
//Breaking senetnce up according to beginoffset
console.log(speak.sentiment.negativity("I hate your guts").words);
console.log(speak.sentiment.analyze("The food is aweful").negative); 
console.log();   

//Tokenize json strings
var fromBot = { "speech":"food is not nice"}
var convertToJson = JSON.stringify(fromBot); //simulate a json string from the front end
var parsedJsonString = JSON.parse(convertToJson);
var getUserInput = parsedJsonString.speech;

//Tokenize a sentence to get its components 
function tokenizer(app){
	var tokenizer = new natural.WordTokenizer();
	app.ask(tokenizer.tokenize(userInput));
}
exports.tokenize = function(request, response) {  
    var app = new ApiAiApp({request: request, response: response});
    var actionMap = new Map();
    actionMap.set("inquiry.tokenize", tokenizer);
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

//API key: AIzaSyBw_8URsgJLwf2MwJhzBinBZZd_0zuUkus
const apiKey = 'Your API Key on Google APP Engine for NLP';
let text = 'The food here is not so good because the chicken is too dry but the food decoration is very nice';
let nlp = new NLP( apiKey )

 // Analyze entities from the text string
 //first sentiment analysis
 //seocnd entity analysis to get the subject
 //third use filter and speak sentiment analysis to get the descriptive words
nlp.analyzeEntities( text )
.then(function( entities ) {
    // 	Output returned entities
    console.log( 'Entities:', entities );
    console.log("Example sentence to be analysed: " + text);
    console.log();
    //create a list with common netrual descriptive words for food
    var filterKeywords = new Filter({ emptyList: true }); 
    filterKeywords.addWords(['dry', 'creamy', 'hot', 'spicy']);
    var indexOfKeywords = [];
    
    for(i = 0; i < entities["entities"].length; i++) {
        console.log( 'Mentions:', entities["entities"][i]["mentions"][0]["text"]["content"] );
        indexOfKeywords.push(entities["entities"][i]["mentions"][0]["text"]["beginOffset"]);
    }
    indexOfKeywords.push(text.length);
    console.log();
    console.log("Analyse the sentence piece by piece: ");

    for(i = 0; i < entities["entities"].length; i++) {

        let substring = text.substring(indexOfKeywords[i], indexOfKeywords[ i + 1 ]);
        let cleanKeywords = filterKeywords.clean(substring)
        console.log((i + 1 ) + ": " + substring);
        console.log();
        
         // Analyze sentiment from the text string
        var obj = "";
        var sentimentScore;
        var negatExpression = "not ";
        var emptyString = "";

        nlp.analyzeSentiment( substring )
           .then(function( sentiment ) {
        obj = sentiment;
        sentimentScore = obj["documentSentiment"]["score"];
        console.log( 'substring:', substring);
        console.log( 'Sentiment:', sentimentScore);

        //Get the key words
        if(sentimentScore < 0) {
            if(speak.sentiment.negativity(cleanKeywords).words.length != 0) {
                console.log(speak.sentiment.negativity(substring).words + emptyString);
            }
            //Extract keywords
            if(getDifference(substring, cleanKeywords)) {
                console.log(getDifference(substring, cleanKeywords));
            }
            //Negate the words
            if(speak.sentiment.positivity(cleanKeywords).words.length != 0) {
                console.log(negatExpression + speak.sentiment.positivity(substring).words)
            }
        }

        if(sentimentScore > 0) {

            if(speak.sentiment.positivity(cleanKeywords).words.length != 0) {
                console.log(speak.sentiment.positivity(substring).words + emptyString);
            }
            //Extract keywords
            if(getDifference(substring, cleanKeywords)) {
                console.log(getDifference(substring, cleanKeywords));
            }
            //Negate the words
            if(speak.sentiment.negativity(cleanKeywords).words.length != 0) {
                console.log(negatExpression + speak.sentiment.negativity(substring).words)
            }
        }
        console.log();
        })
        .catch(function( error ) {
        console.log( 'Error:', error.message );
        })

    }
})
.catch(function( error ) {
    // 	Error received, output the error
    console.log( 'Error:', error.message );
})

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
