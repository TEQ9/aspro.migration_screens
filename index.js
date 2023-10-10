const { app } = require("./lib/source");

const ready =  app.__loadApplication();
if (!ready) {
    app.__closeApplication();
}

const database =  app.getDatabase();
const [oldPath, newPath] = app.getPaths();
let oldCounter = 0; let newCounter = 0;

async function main() {
    const [browser, page] = await app.InitializateBrowser();

    for (let i = 0; i < database.length; i++) {
        app.Log(`Выполняю кейс ${database[i].case}`, true);
        try {
            app.Log(`Новый сайт. Перехожу по URL ${database[i].link_new}`, true);
            await page.goto(database[i].link_new, {waitUntil: 'load', timeout: '60000'});
            let selector = database[i].selector_new ? database[i].selector_new : false;
            if (!selector) {
                newCounter++;
                app.Log(`Делаю скриншот страницы, по порядку - ${newCounter}`);
                await app.Delay(1000);
                await page.screenshot({
                    path: `${newPath}${newCounter}.jpg`,
                    fullPage: true
                })
            } else {
                newCounter++;
                app.Log(`Делаю скриншот элемента, по порядку - ${newCounter}`);
                let element = await page.$(selector);
                await app.Delay(1000);
                await element.screenshot({
                    path: `${newPath}${newCounter}.jpg`
                })
            }
        } catch (e) {
            app.Log(`ОШИБКА: ${e}`, true);
        }
        try {
            app.Log(`Старый сайт. Перехожу по URL ${database[i].link_old}`, true);
            await page.goto(database[i].link_old, {waitUntil: 'load', timeout: '60000'});
            let selector = database[i].selector_old ? database[i].selector_old : false;
            if (!selector) {
                oldCounter++;
                app.Log(`Делаю скриншот страницы, по порядку - ${oldCounter}`);
                await app.Delay(1000);
                await page.screenshot({
                    path: `${oldPath}${oldCounter}.jpg`,
                    fullPage: true
                });
            } else {
                oldCounter++;
                app.Log(`Делаю скриншот элемента, по порядку - ${oldCounter}`);
                let element = await page.$(selector);
                await app.Delay(1000);
                await element.screenshot({
                    path: `${oldPath}${oldCounter}.jpg`
                })
            }
        } catch (e) {
            app.Log(`ОШИБКА: ${e}`, true);
        }
    }
    app.Log(`Выполнение приложения окончено`);
    app.CloseBrowser(browser);
    app.__closeApplication();
}

main();