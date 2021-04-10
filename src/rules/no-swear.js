import words from '../words.json';

export function create(context) {
    return {
        Identifier(node) {
            if (words.includes(node.name)) {
                context.report({
                    node,
                    message : 'Swear found'
                });
            }
        }
    };
}


export const meta = {
    type : 'suggestion',
    docs : {
        description : 'prevent from using pejoratives and abuse words',
        category    : 'Best Practices',
        recommended : true
    },
    schema : [] // no options
};
