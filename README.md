Необходимые действия перед первым запуском:
  1. Установить Node JS (минимум 18.0 версия)
  2. В консоли установить фреймворк Puppeteer глобально (npm i -g puppeteer)

Запуск производится через .bat или node index.js из консоли.

После запуска программы будет запрошено НАЗВАНИЕ файла, который будет исполняться. Выписать без пути и расширения, например "base".
Сами файлы формата JSON лежат в папке database, для примера оставлен JSON файл.

В JSON файле указываются полный урл на страницу, для старого и нового определены отдельные строки.
Если необходимо заскринить всю страницу, поле SELECTOR оставлять пустым. Если необходим элемент, заполнить поле родительским селектором элемента.

При запуске создаётся сессия, для сессии в папке logs создаётся папка. В папке указан файл логов и папки для скирнов - new_screens и old_screens.

ВАЖНО: Для корректных скринов необходимо отключить lazyload на странице.
