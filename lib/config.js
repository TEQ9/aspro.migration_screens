const config = {
    ////////////////////////////////////////
    // Puppeteer settings

    // Булевый, определяет запуск без интерфейса
    // True, False
    headless: false,
    
    // Число, замедление теста на ms
    slowmo: 0,

    // Массив
    // Размер окна => --window-size=${1920},${1080}
    // Для запуска на сервере --no-sandbox 
    // Игнорировать ссл ошибки сертификатов '--ignore-certificate-errors'
    args: [`--window-size=${1920},${1080}`, '--no-sandbox', '--ignore-certificate-errors'],

    // Отключает запуск в дефолтном разрешении 800х600
    defaultViewport: null,

    ////////////////////////////////////////
    // Пути
    jsonPath: "database/"
}

exports.config = config;