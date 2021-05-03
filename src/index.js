module.exports = {
    rules : {
        'no-swear' : require('./rules/no-swear')
    },
    configs : {
        recommended : {
            rules : {
                'censor/no-swear' : 2
            }
        }
    }
};
