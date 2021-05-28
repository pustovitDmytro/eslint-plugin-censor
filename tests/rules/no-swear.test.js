import { RuleTester } from 'eslint';
import { rules } from '../entry';

const rule = rules['no-swear'];
const ruleTester = new RuleTester({
    'parserOptions' : {
        'ecmaVersion' : 2017
    }
});

suite('Rule no-swear');

test('Swear in function name [FunctionDeclaration] [Identifier]', function () {
    ruleTester.run('no-swear', rule, {
        valid : [ `
            function factorial(n) {
                // do some stuff
                return n + 1;
            }
        ` ],
        invalid : [
            {
                code : `
                function fuck(n) {
                    // do some stuff
                    return n + 1;
                }
                `,
                errors : [ { message: 'Identifier fuck is considered as swear word [fuck]' } ]
            }
        ]
    });
});

test('Swear in variable name [VariableDeclaration] [Identifier]', function () {
    ruleTester.run('no-swear', rule, {
        valid : [
            'const n = 5;',
            'const password = "jkdslfj";'
        ],
        invalid : [
            {
                code   : 'let asshole = 0',
                errors : [ { message: 'Identifier asshole is considered as swear word [ass]' } ]
            }
        ]
    });
});

test('Swear in variable value [VariableDeclaration] [Literal]', function () {
    ruleTester.run('no-swear', rule, {
        valid : [
            'let n = "top good";'
        ],
        invalid : [
            {
                code   : 'let x = "yellowShowered"',
                errors : [ { message: 'Literal yellowShowered is considered as swear word [yellow_shower]' } ]
            }
        ]
    });
});

