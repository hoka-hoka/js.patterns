### Содержание
1. [Компиляция scss в css](#Компиляция-scss-в-css)
2. [Автопрефиксы с помощью PostCSS](#Автопрефиксы-с-помощью-PostCSS)
3. [BrowserSync](#BrowserSync)
4. [Uglifying файлы JavaScript](#Uglifying-файлы-JavaScript)
5. [Объединение задач](#Объединение-задач)
6. [Наблюдатели](#Наблюдатели)

--save-dev - пакет попадает в devDependencies и используется только при разработке и не участвует при просмотре.

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
 ```"
 scripts": {
  "autoprefixer": "postcss -u autoprefixer -r build/css/*"
}
```
где 
-u - это use
-r - replace

##### BrowserSync
`npm i -D browser-sync`

Подключение:
```
"scripts": {
  "serve": "browser-sync start --server --files 'build/css/*.css, build/js/*.js'"
}
```

##### Uglifying файлы JavaScript
`npm install uglify-js -g`
Подключение:
```
"scripts": {
  "uglify": "mkdir -p dist/js & uglifyjs src/js/*.js -m -o dist/js/app.js"
}
```
где mkdir - создать новый файл, но толькое если он не существует (-p).
& - позволяет объединить несколько команд, параллельно выполняя каждую из них.

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