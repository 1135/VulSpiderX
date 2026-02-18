
const moudule_random = require('./module_random');
const bot = require('./lib/bot');
const utils = require('./lib/utils');

async function app() {
    console.log("VulSpiderX Started.");

    if (process.env.CI || process.env.SINGLE_RUN) {
        console.log("Running in CI/Single-run mode.");
        await bot.runOnce();
        console.log("Done.");
        return;
    }

    while (1) {
        await bot.runOnce();
        utils.print_current_time();

        // Wait 10-20 minutes
        let wait_time = moudule_random.randomIntInc(10, 20) * 60 * 1000;
        console.log("Wait " + wait_time / (60 * 1000) + " minutes for the next crawl.");
        await utils.sleep(wait_time);
    }
}

app();
