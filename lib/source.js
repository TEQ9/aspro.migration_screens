const fs = require('fs');
const { config } = require("./config");
const prompt = require('prompt-sync')();
const puppeteer = require("puppeteer");

let logPath, session;
let stringCounter = 0;

let database;

class application {
    static __loadApplication() {
        console.log('Loading application');
        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs');
        }

        let date = this.GetDate();
        session = this.GetRandomInt(1000000000);

        logPath = `logs/${session}/log_${date}.txt`;
        fs.mkdirSync(`logs/${session}`);

        fs.writeFileSync(logPath, `Session ${session} started\n`, () => {
            console.log(`Session ${session} started`);
        });

        return true;

    }
    static getPaths() {
        fs.mkdirSync(`logs/${session}/old_screens`);
        fs.mkdirSync(`logs/${session}/new_screens`);
        const oldPath = `logs/${session}/old_screens/`;
        const newPath = `logs/${session}/new_screens/`;

        return [oldPath, newPath];
    }
    static getDatabase() {
        while (true) {
            const answer = prompt('Введи название файла без расширения или exit для выхода :: ');
            switch (answer) {
                case "exit":
                    this.__closeApplication();
                default:
                    try {
                        database = JSON.parse(fs.readFileSync(`${config.jsonPath}${answer}.json`));
                        this.Log(`Файл ${answer} прочитан и загружен`, true);
                        return database;
                    } catch (e) {
                        this.Log(`Файл ${answer} не найден`, true);
                    }
            }
        }
    }
    static async Delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    static async InitializateBrowser() {
        const browser = await puppeteer.launch({
            headless: config.headless,
            slowMo: config.slowmo,
            args: config.args,
            defaultViewport: config.defaultViewport
        })

        let tmp = await browser.pages();
        const page = await tmp[0];

        return [browser, page];
    }
    static Log(dump, visibility) {
        if (typeof dump != 'string') {
            String(dump);
        }
        if (visibility) {
            console.log(dump);
        }
        stringCounter++;
        fs.appendFileSync(logPath, `\n${stringCounter}: ${dump}`, () => {});
    }
    static GetRandomInt(int) {
        return Math.floor(Math.random() * int);
    }
    static GetDate() {
        let date = new Date;

        let b = date.getDate();
        let c = date.getMonth();
        let d = date.getFullYear();
        let e = date.getHours();
        let f = date.getMinutes();

        let result = String(`${b}-${c}-${d} ${e}-${f}`);
        return result;
    }
    static CloseBrowser(browser) {
        browser.close();
    }
    static __closeApplication() {
        this.Log(`Сессия ${session} окончена. Выключаю приложение`, true);
        process.exit();
    }
}

exports.app = application;