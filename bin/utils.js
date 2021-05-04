const YARGS_FAIL_CODE = 2;

export function onYargsFail(rej, message, error, ygs) {
    const failMessage = message || error;

    ygs.showHelp('error');
    if (failMessage) {
        console.error(failMessage.toString());
        console.error(error?.stack);
    }

    if (rej) return rej(failMessage);
    process.exit(YARGS_FAIL_CODE);
}

export function cliCommand(method, isMain) {
    // eslint-disable-next-line func-style
    const f =  async function (...args) {
        try {
            const result = await Promise.resolve(method.apply(this, args));

            return result;
        } catch (error) {
            console.error(error.toString());
            console.error(error.stack);
            if (isMain) process.exit(1);

            throw error;
        }
    };

    return f;
}
