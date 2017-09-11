module.exports = function (watson){
    return {
        personality_insights: watson.personality_insights({
            username: '2df7a8a9-6cbe-4528-abfb-cb4b6dc2a657',
            password: 'eAQwvJiwmC84',
            version: 'v2'
        }),

        tone_analyzer: watson.tone_analyzer({
            username: '2df7a8a9-6cbe-4528-abfb-cb4b6dc2a657',
            password: 'eAQwvJiwmC84',
            version: 'v3-beta',
            version_date: '2016-02-11'
        })
    }
}