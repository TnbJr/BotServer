var apiai = require("apiai")
var api = require('../apiai_config.js')(apiai);


module.exports = function (botSettings, bot, botController){
    botController.on('direct_mention', function(bot, message) {

        if (message.type !== "message") {
            return false;
        }

        var request = api.textRequest(message.text);

        request.on('response', function(response) {
            console.log(response);
            bot.reply(message, response.result.metadata.speech);
        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
    });
};
