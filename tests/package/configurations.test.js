import { assert } from 'chai';
import { rules, configs } from '../entry';

suite('Configurations');

test('exported rules', function () {
    assert.exists(rules);
    assert.isObject(rules);
    assert.isNotEmpty(rules);
});

test('exported configs', function () {
    assert.exists(configs);
    assert.isObject(configs);
    assert.isNotEmpty(configs);
});
