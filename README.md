### Содержание

1. [Компиляция scss в css](#Компиляция-scss-в-css)
2. [Автопрефиксы с помощью PostCSS](#Автопрефиксы-с-помощью-PostCSS)
3. [BrowserSync](#BrowserSync)
4. [Uglifying файлы JavaScript](#Uglifying-файлы-JavaScript)
5. [Объединение задач](#Объединение-задач)
6. [Наблюдатели](#Наблюдатели)

npm home package - откроет оффициальную страницу пакета.
npm repo package - git hub репозиторий пакета
npm outdated - проверяет усаревшие пакеты
npm prune - сравние package.json и node_modules

"dependencies" - пакеты необходимые для работы приложения (--save-dev).
"devDependencies" - пакеты необходимые только для локальной разработки и тестирования([--save-prod] или --production).

##### Компиляция scss в css:
`npm install --save-dev node-sass`
После чего его можно использовать:
`"node-sass sass/ -o build/css/"`
где флаг -o это output
Теперь рабочий скрипт можно переместить в package.json:
```"
scripts": {
  "scss": "node-sass --indent-type tab --output-style nested sass/ -o build/css/
}
```
Запуск командой: `npm run scss`. Остальные опции можно посмотреть на node-sass.

##### Автопрефиксы с помощью PostCSS
`npm install --save-dev postcss-cli autoprefixer`

PostCSS, по умолчанию, ничего не делает. Он использует другие плагины, такие как Autoprefixer, для манипулирования предоставленным ему CSS.

Добавим новую задачу в package.json:
```
 "scripts": {
  "autoprefixer": "postcss -u autoprefixer -r build/css/*"
}
```
где 
-u - это use
-r - replace

##### BrowserSync
`npm install --save-dev browser-sync`

Подключение:
```
"scripts": {
  "serve": "browser-sync start --server --files 'build/css/*.css, build/js/*.js'"
}
```

##### Uglifying файлы JavaScript
Минимизирует js
`npm install uglify-js -g`
Подключение:
```
"scripts": {
  "uglify": "mkdir -p dist/js & uglifyjs src/js/*.js -m -o dist/js/app.js"
}
```
где mkdir - создать новый файл, но толькое если он не существует (-p).
& - позволяет объединить несколько команд, параллельно выполняя каждую из них.

uglify-js не поддерживает формат ES6, который по умолчанию может выдавать babel, поэтому лучше использовать uglify-es.
`npm install --save-dev uglify-es`

Чтобы минимизировать каталог целиком можно использовать uglifyjs-folder
`npm install uglifyjs-folder --save-dev`

Скрипт:
```
"uglifyjs": "uglifyjs-folder --config-file \"./uglify.config.json\" dist/js/ -eo dist/js-min",
```
где uglify.config.json это файл с конфигурацией для uglify-folder.
```
{
  "compress": true,
  "mangle": true,
  "sourceMap": {
    "includeSources": true,
    "root": "dist/js-min",
    "url": "{file}.map"
  }
}
```

##### Объединение задач
Добавим задачу, которая объединит задачи css.
```
"scripts": {
  "build:watch": "onchange \"src/sass/*.scss\" -- npm run build:css"
}
```
Вообще должны быть одинарные кавычки, но в Windows нужно экранировать.

##### Наблюдатели
Можно добавить задачи, которые будут следить за изменениями и запускаться автоматичесеки.

`npm install onchange`
Использование:

`"watch:css": "onchange 'src/scss/*.scss' -- npm run build:css",`
onchange ожидает путь в виде строки к файлу. Команда, которую мы хотим выполнить, идет после -- и запускается каждый раз, когда файлы по указанному пути добавляются, изменяются или удаляются

##### Babel
npm i --save-dev @babel/core @babel/cli @babel/node @babel/preset-env
npm i --save @babel/polyfill

1. @babel/core — непосредственно сам трансплайнер;
2. @babel/cli— позволяет компилировать файлы с помощью командной строки для преобразования кода к версии языка ES5;
3. @babel/node — утилита командной строки, которая работает также, как и Node cli, но дополнительно использует установленные babel-плагины и пресеты, прогоняя код через них перед запуском;
4. @babel/preset-env открывает доступ к новым возможностям языка JavaScript
5. @babel/polyfill - добавляет полифилы.

Далее нужно создать конфигурационный файл для babel, в котором нужно подключить установленные ранее дополнительные зависимости, т.к. по умолчанию babel не будет работать с ними. Называется он .babelrc.

Далее добавляются задачи
```
"scripts": { 
  "build": "babel src --out-dir dist --source-maps inline"
}
```
Для генерации soureMap можно использовать не флаг, а указать настройку в файле .babelrc.json
`"sourceMap": "inline"`

### Параллельное и последовательное выполнение задач

На Windows мы не можем использовать & для параллельного выполнения. Вместо этого можно использовать npm-run-all (npm install --save-dev npm-run-all)
`"series": "npm-run-all task1 task2 task3"`
Также становится доступна команда для последовательного запуска:
`"build": "run-s series list"`
run-s