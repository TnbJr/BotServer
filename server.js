/**
 * @server.js
 *
 * This is the main module in the botserver node app: the app is started by running
 * 'node server.js'.
 * This module does two things:
 *  -sets up CRUD routes for the bot API
 *  -instantiates a botManager object and runs its init method (see ./lib/bot_libraries/botManager.js)
 */


var express = require('express');
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/botdb");

var Bot = require('./app/models/bot');
var BotManager = require('./lib/bot_libraries/botManager.js');

//body-parser is a body parsing middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//it will only be parsing JSON
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var router = express.Router();


router.route('/bots')

    //create new bot
    .post(function(req, res){

        var bot = Bot(req.body.bot);

        bot.save( function(err){
            if (err)
                res.send(err);
            res.json({
                message: 'Bot created!',
                bot_id: bot._id
            });
        });

        //instantiate and start the bot
        botManager.addBot(bot);
    });


router.route('/bots/:bot_id')

    //get a single bot by id
    .get(function(req, res){
        Bot.findById(req.params.bot_id, function(err, bot){
            if (err)
                res.send(err);
            res.json(bot);
        });
    })


    //update the properties of a single bot by id
    .put(function(req, res){
        Bot.findById(req.params.bot_id, function(err, bot){
            if (err)
                res.send(err);

            //caller will include the properties of bot in reqeust
            bot.properties = req.body.properties;
            bot.save(function(err){
                if(err)
                    res.send(err);
                res.json({ message: 'Bot updated!' });
            });

            //update botModel in the botManager
            botManager.updateBot(bot);
        });
    })


    //delete the bot by id
    .delete(function(req,res){
        var bot_id = req.params.bot_id;
        Bot.remove({
            _id: bot_id
        }, function(err, bot){
            if (err)
                res.send(err);
            //remove bot from botManager
            botManager.deleteBot(bot_id);

            res.json({ message: 'Deleted bot!' });
        });
    });




app.use('/api', router);


//start the server
var port = process.env.PORT || 8080;
app.listen(port);
console.log("we are conneted")


//start the botManager
var botManager = BotManager();
botManager.init();
