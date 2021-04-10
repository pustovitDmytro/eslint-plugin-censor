import RuleTester from 'eslint/lib/testers/rule-tester';
import plugin from '../entry';

const rule = plugin.rules['no-swear'];
const ruleTester = new RuleTester();

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
                errors : [ { message: 'Swear found' } ]
            }
        ]
    });
});
