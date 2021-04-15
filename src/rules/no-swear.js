import blackList from '../words/blackList.json';
import whiteList from '../words/whiteList.json';

function findInList(list, word) {
    return list.find(w =>
        Array.isArray(w)
            ? w.every(ww => word.includes(ww))
            : word.includes(w)
    );
}

function checkSwear(node, word, context) {
    const sanitized = `${word}`.toLowerCase();
    const isBad = findInList(blackList, sanitized);

    if (isBad) {
        const justified = findInList(whiteList, sanitized);

        if (!justified) {
            const match = Array.isArray(isBad) ? isBad.join('_') : isBad;

            context.report({
                node,
                message : `${node.type} ${word} is considered as swear word [${match}]`
            });
        }
    }
}

export function create(context) {
    return {
        Identifier(node) {
            checkSwear(node, node.name, context);
        },
        Literal(node) {
            checkSwear(node, node.value, context);
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
