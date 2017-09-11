var natural = require('natural');

module.exports = function (botSettings, bot, botController){

    //Natural Language Classifier training
    classifier = new natural.BayesClassifier();

    var responses = {};

    for (var key in botSettings) {
        if (botSettings.hasOwnProperty(key)) {

            //train the AI using multiple forms of the question
            for (var question in botSettings[key]["questions"]) {
                console.log(key + ": " + botSettings[key]["questions"][question]);
                classifier.addDocument(botSettings[key]["questions"][question], key);
            }

            //set the response
            responses[key] = botSettings[key]["answer"];
        }
    }

    classifier.train();

    botController.on('direct_mention', function(bot, message) {
        if (message.type !== "message"){
            return false;
        }

        console.log("QESTION: " + message.text);
        console.log(classifier.getClassifications(message.text));

        bot.reply(message, responses[classifier.classify(message.text)]);
    });
};
