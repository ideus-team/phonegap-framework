#Installation

##Установка и настройка окружения (windows)

1. Install [nodeJS](https://nodejs.org/en/), current version.
2. Install [Android Studio](https://developer.android.com/studio/index.html) and all latest packages.
  - [Video instractions](https://www.youtube.com/watch?v=xWa8Rf9cBps)
3. Install [Cordova CLI](https://cordova.apache.org/#getstarted)
4. Install [Phonegap framework](http://phonegap.com/getstarted)
4. Install [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)
[JDK!](http://joxi.ru/JMAj0dKcy0vPme.jpg)

##Установка и запуск фреймворка

1. Clone framework from git

```cli
git clone https://github.com/ideus-team/phonegap-framework.git
```
Если фреймворк уже есть у вас на компьютере, то делаем pull, чтобы забрать последнюю версию

2. Копируем папку `application` из `phonegap-framework` в свой проект
3. Открываем консоль из папки `application` и запускаем: `npm i`.
4. Когда все пакеты установились в этой же папке запускаем одну из команд:
  - `npm run dev` - для работы в dev режиме.
  - `npm run prod` - для работы в продакшн релизе. (отличие dev и prod в том, что на prod все файлы минифицируются)
5. Переходим в папку src и начинаем ~~говно~~кодить.

##Что где писать?

###Javascript

Все javascript файлы пишутся в папку `src/js`. Весь javascript должен быть написан на ES6+ версии.

###Styles

Все стили пишутся в папке `src/sass`. Пишем и верстаем по [BEM](https://github.com/ideus-team/guidelines/blob/master/frontend/bem.md)

##А куда же в итоге все собирается?

Ответ прост. Gulp собирает весь проект в `application/public`.