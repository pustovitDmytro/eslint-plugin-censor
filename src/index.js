const rules = {
    'no-swear' : require('./rules/no-swear')
};

const configs = {
    recommended : {
        rules : {
            'censor/no-swear' : 2
        }
    }
};

export { rules, configs };
