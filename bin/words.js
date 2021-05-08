#!./node_modules/.bin/babel-node
import path from 'path';
import yargs from 'yargs/yargs';
import fs from 'fs-extra';
import { isArray, toArray } from 'myrmidon';
import { Stemmer, Languages } from 'multilingual-stemmer';
import { cliCommand } from './utils';

// Create a stemmer for the english language
const stemmer = new Stemmer(Languages.English);

const isMain = !module.parent;
const BLACKLIST_JSON_PATH = path.join(__dirname, '../src/words/blackList.json');
const WHITELIST_JSON_PATH = path.join(__dirname, '../src/words/whiteList.json');
const MIN_TERMINAL_WIDTH = 95;
const STEM_MIN_LENGTH = 2;

function stem(word) {
    return stemmer.stem(word);
}

async function loadJSON(filePath) {
    if (!await fs.exists(filePath)) {
        console.warn(`no words file found in ${filePath}`);

        return [];
    }

    return fs.readJSON(filePath);
}

const sumLength = (prev, curr) => prev + curr.length;

function merge(current, income) {
    console.log(`Current words: ${current.length}\nIncome words: ${income.length}`);
    const normalized = [ ...current, income.map(w => {
        const array = isArray(w) ? w : w.toLowerCase().split(/\W/);
        const stemmed = array.map(item => stem(item));

        return stemmed.filter(i => i.length > STEM_MIN_LENGTH);
    }) ];

    normalized.sort((a, b) => {
        const byArrLength = a.length - b.length;

        if (byArrLength) return byArrLength;
        const byWordLength = a.reduce(sumLength, 0) - b.reduce(sumLength, 0);

        if (byWordLength) return byWordLength;

        return a[0] > b[0] ? 1 : -1;
    });

    const filterDublicates = normalized
        .filter(w => w.length)
        .filter((word, index, all) => {
            const firstOccurence = all.findIndex(item =>
                item.every(i => word.some(w => w.includes(i))));

            return firstOccurence === index;
        });

    console.log(`Filtered ${normalized.length - filterDublicates.length} dublicates`);

    return filterDublicates.map(items => items.length === 1 ? items[0] : items);
}


function mergeWhite(current, income, black) {
    console.log(`Current words: ${current.length}\nIncome words: ${income.length}`);
    function hasBadPart(word) {
        const isTreatBad = black.find(ws => isArray(ws)
            ? ws.every(w => word.some(ww => ww.includes(w)))
            : word.some(ww => ww.includes(ws)));

        if (!isTreatBad) {
            console.log(word, isTreatBad);
        }

        return !!isTreatBad;
    }

    const normalized = [
        ...current.map(toArray),
        ...income.map(w => {
            const array = isArray(w) ? w : w.toLowerCase().split(/\W/);
            const stemmed = array.map(item => item);

            return stemmed.filter(i => i.length > STEM_MIN_LENGTH);
        })
    ];

    const filtered = normalized
        .filter(w => w.length)
        .filter(hasBadPart);

    console.log(`Filtered ${normalized.length - filtered.length} not matching bad, Left: ${filtered.length} words`);

    const filterDublicates = filtered
        .filter(w => w.length)
        .filter((word, index, all) => {
            const firstOccurence = all.findIndex(item =>
                item.every(i => word.some(w => w === i)));

            return firstOccurence === index;
        });

    console.log(`Filtered ${filtered.length - filterDublicates.length} dublicates, Left: ${filterDublicates.length} words`);

    return filterDublicates.map(items => items.length === 1 ? items[0] : items);
}

async function save(args) {
    const words = args.words || [];

    if (args.file) {
        const content = await fs.readFile(args.file);

        words.push(...content.toString().split(/\n|\r\n/));
    }

    if (!words.length) console.warn('No new words specified');
    const current = await loadJSON(BLACKLIST_JSON_PATH);
    const merged = merge(current, words);

    if (args.confirm) {
        await fs.writeJSON(BLACKLIST_JSON_PATH, merged);
        console.log(`New words written to ${BLACKLIST_JSON_PATH}`);
    }
}

async function saveWhite(args) {
    const words = args.words || [];

    if (args.file) {
        const content = await fs.readFile(args.file);

        words.push(...content.toString().split(/\n|\r\n/));
    }

    if (!words.length) console.warn('No new words specified');
    const current = await loadJSON(WHITELIST_JSON_PATH);
    const black = await loadJSON(BLACKLIST_JSON_PATH);
    const merged = mergeWhite(current, words, black);

    if (args.confirm) {
        await fs.writeJSON(WHITELIST_JSON_PATH, merged);
        console.log(`New words written to ${WHITELIST_JSON_PATH}`);
    }
}

export default async function run(cmd) {
    const Argv = yargs(cmd)
        .usage('Usage: $0 <command> [options]')
        .command({
            command : 'black',
            builder : yar => yar
                .usage('Usage: $0 black <command> [options]')
                .command({
                    command : 'list [--confirm] <words...>',
                    builder : y => y
                        .option('words', {
                            describe     : 'words to add',
                            demandOption : true,
                            type         : 'array'
                        })
                        .option('confirm', {
                            describe     : 'save to file, if not set only analize',
                            alias        : [ 'y' ],
                            demandOption : false,
                            type         : 'boolean'
                        }),
                    desc    : 'Save new words to common black list from cli',
                    handler : cliCommand(save)
                })
                .command({
                    command : 'file <file> [--confirm]',
                    builder : y => y
                        .option('file', {
                            alias        : [ 'f' ],
                            demandOption : true,
                            describe     : 'path to file, where words are stored',
                            type         : 'string'
                        })
                        .option('confirm', {
                            describe     : 'save to file, if not set only analize',
                            alias        : [ 'y' ],
                            demandOption : false,
                            type         : 'boolean'
                        }),
                    desc    : 'Save new words to common black list from file',
                    handler : cliCommand(save)
                }),
            desc : 'Save new words to black list'
        })
        .command({
            command : 'white',
            builder : yar => yar
                .usage('Usage: $0 white <command> [options]')
                .command({
                    command : 'list [--confirm] <words...>',
                    builder : y => y
                        .option('words', {
                            describe     : 'words to add',
                            demandOption : true,
                            type         : 'array'
                        })
                        .option('confirm', {
                            describe     : 'save to file, if not set only analize',
                            alias        : [ 'y' ],
                            demandOption : false,
                            type         : 'boolean'
                        }),
                    desc    : 'Save new words to common white list from cli',
                    handler : cliCommand(saveWhite)
                })
                .command({
                    command : 'file <file> [--confirm]',
                    builder : y => y
                        .option('file', {
                            alias        : [ 'f' ],
                            demandOption : true,
                            describe     : 'path to file, where words are stored',
                            type         : 'string'
                        })
                        .option('confirm', {
                            describe     : 'save to file, if not set only analize',
                            alias        : [ 'y' ],
                            demandOption : false,
                            type         : 'boolean'
                        }),
                    desc    : 'Save new words to common white list from file',
                    handler : cliCommand(saveWhite)
                }),
            desc : 'Save new words to white list'
        })
        .help('h')
        .alias('h', 'help')
        .wrap(Math.min(MIN_TERMINAL_WIDTH, process.stdout.columns))
        .demandCommand(1, '').recommendCommands().strict();

    await Argv.argv;
}

const commandArgsIndex = 2;

if (isMain) run(process.argv.slice(commandArgsIndex));
