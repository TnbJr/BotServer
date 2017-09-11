#BotServer

##Summary:
Botserver is a back end API that can be used to deploy and host different types of chatbots on Slack. It is built on Node.js and MongoDB. So far, the app can deploy three different kinds of bots: ToneBot, FAQbot, and InfoBot.

ToneBot: Uses the IBM Watson Tone Analyzer API to respond to emotional tones in conversations. Users can set threshold and canned responses for 5 different tones: Joy, Fear, Anger, Disgust and Sadness. 

FAQbot: Uses natural language processing to create an interactive FAQ. Users must train the bot on multiple versions of each question.

InfoBot: A general purpose question and answer bot that uses the API.ai API for knowledge base querying.

##Installation:

Install NodeJS

Install MongoDB

Sign up for an IBM Bluemix account and get credentials for the Tone Analyzer and Personality Insights APIs

Add your IBM Watson credentials to 'botserver/lib/watson_config.js'. The file should be in the following format:

    module.exports = function (watson){
        return {
            personality_insights: watson.personality_insights({
                username: '****YOUR USERNAME****',
                password: '****YOUR PASSWORD****',
                version: 'v2'
            }),

            tone_analyzer: watson.tone_analyzer({
                username: '****YOUR USERNAME****',
                password: '****YOUR PASSWORD****',
                version: 'v3-beta',
                version_date: '2016-02-11'
            })
        }
    }
Sign up for an api.ai account, and copy for client access token and developer access token in to 'botserver/lib/apiai_config.js'. The file should be in the following format:

    module.exports = function (apiai){
        return apiai(
            '****CLIENT ACCESS TOKEN****',
            '****DEVELOPER ACCESS TOKEN****'
        );
    };

Install dependency packages by running the following terminal command:

    npm install

Start the app by running the following terminal command:

    node server.js

