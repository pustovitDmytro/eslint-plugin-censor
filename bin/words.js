#!./node_modules/.bin/babel-node
import path from 'path';
import yargs from 'yargs/yargs';
import fs from 'fs-extra';
import { onYargsFail, cliCommand } from './utils';

const isMain = !module.parent;
const COMMON_JSON_PATH = path.join(__dirname, '../src/words.json');

async function loadJSON(filePath) {
    if (!await fs.exists(filePath)) {
        console.warn(`no current words file found in ${COMMON_JSON_PATH}`);

        return [];
    }

    return require(filePath);
}

function merge(current, income) {
    console.log(`Current words: ${current.length}\nIncome words: ${income.length}`);
    const words = [ ...current, ...income ];
    const normalized = words.map(w => {
        const caseInsensitive = w.toLowerCase();
        const toOneWord = caseInsensitive.replace(/\W/g, '');

        return toOneWord;
    });

    normalized.sort((a, b) => a.length - b.length);

    const filterDublicates = normalized.filter((word, index) => {
        const firstOccurence = normalized.findIndex(item => word.includes(item));

        return firstOccurence === index;
    });

    console.log(`Filtered ${normalized.length - filterDublicates.length} dublicates`);

    return filterDublicates.sort();
}

async function save(args) {
    const words = args.words || [];

    if (args.file) {
        const content = await fs.readFile(args.file);

        words.push(...content.toString().split(/\n|\r\n/));
    }

    if (!words.length) console.warn('No new words specified');
    const current = await loadJSON(COMMON_JSON_PATH);
    const merged = merge(current, words);

    if (args.confirm) {
        await fs.writeJSON(COMMON_JSON_PATH, merged);
        console.log(`New words written to ${COMMON_JSON_PATH}`);
    }
}

export default async function run(cmd) {
    await new Promise((res, rej) => {
        const Argv = yargs(cmd)
            .usage('Usage: $0 <command> [options]')
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
                desc    : 'Save new words to common json list',
                handler : cliCommand(save)
            })
            .command({
                command : 'file <file> [--confirm]',
                builder : y => y
                    .option('file', {
                        alias        : [ 'f' ],
                        demandOption : true,
                        describe     : 'path to file, where words need to be added',
                        type         : 'string'
                    })
                    .option('confirm', {
                        describe     : 'save to file, if not set only analize',
                        alias        : [ 'y' ],
                        demandOption : false,
                        type         : 'boolean'
                    }),
                desc    : 'Save new words to common json list',
                handler : cliCommand(save)
            })
            .help('h')
            .alias('h', 'help')
            .wrap(Math.min(95, process.stdout.columns))
            .demandCommand(1, '').recommendCommands().strict()
            .onFinishCommand(res)
            .fail(onYargsFail.bind(null, !isMain && rej));

        return Argv.argv;
    });
}

if (isMain) run(process.argv.slice(2));
