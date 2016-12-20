#Changelog

Lates version of Framework is 2.0.0


##2.0.0

1. Grunt заменен на Gulp
2. Используется ES6
3. Не используется requireJS для создания и подключения модулей
4. Добавлена минификация javascript\css\img
5. Добавлен JSLint\CSSLint
6. Добавлена возможность устанавливать javascript плагины с `npm` и использовать их через `require('MODULE_NAME');`
7. Добавлена документация по всем модулям и в целом по API фреймворка. Вся документация структурирована. Добавлено меню для навигации по документации.
8. Добавлена документация "How to..." к:
  - Как сбилдить android release и добавить его в Google Play Market.
  - Как и какие иконки и сплеши добавлять в приложение, как они должны называться и какие разрешения у них должны быть.
  - Как установить окружение для работы с фреймворком под Windows и как начать работу с фреймворком.
  - Какие плагины лучше всего использовать. Список плагинов
  - Структурирован список заметок на возможные ошибки или решение некоторых проблем

##1.0.0

1. Добавлен Grunt только для сборки css файлов
2. Используется ES5
3. Все модули создаются с помощью requireJS
4. В каждый модуль подключаются зависимости, модели, коллекции, представления, утилиты, шаблоны и т.д.
5. Нет минификации javascript