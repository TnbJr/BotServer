var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/botdb");

var Bot = require('./app/models/bot');

var bot = new Bot();


bot.active = true;
bot.service = "slack";
bot.controllerType = "azizContoller";
bot.type = "azizBot";
bot.teamID = "";
bot.token = "xoxb-22386467188-hVTzv9TXTIUnjsNJr2poZ82q";

var properties = {
    "anger": {
        "threshold": 0.4,
        "responses": [
            "Don't be so angry!",
            "Come on...settle down!"
        ],
     },
    "joy": {
        "threshold": 0.6,
        "responses": [
            "Man, you are happy today!",
            "Good stuff!"
        ],
    },
    "sadness": {
        "threshold": 0.4,
        "responses": [
            "Don't be sad. I am here to comfort you!",
            "Aww cheer up motherfucker!"
        ],
    },
    "disgust": {
        "threshold": 0.4,
        "responses": [
            "yeah.....ewww",
            "oy.....now I am going to be sick"
        ],
    },
    "fear": {
        "threshold": 0.4,
        "responses": [
            "Don't be scared! I will protect you :)",
            "OH NO!!!!"
        ],
    }
}

bot.properties = properties;
console.log(bot);

bot.save(function(err){
    if (err){
        console.log("couldn't save bot to db", err);
    } else {
        console.log("bot saved");
    }
});

mongoose.disconnect();