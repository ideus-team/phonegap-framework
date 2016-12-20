#Settings

Это объект, который хранит в себе настройки приложения.

Имя опции    | Описание
------------ | -------------
initEvent      | Событие по которому приложение стартует
platform      | Платформа, на которой в данный момент работает приложение
debug      | Параметр, который говорит приложению, что сейчас ведется dev разработка или же release
sqlServer      | Объект, который содержит параметры, по которым фармируется url по которому будут отсылаться запросы на сервер
options      | Объект с настройками приложения. Эти параметры передаются в App как опции по умолчанию, но с помощью дополнительных опций переданых в `App.init(ВОТ_СЮДА)` - можно расширить или заменить настройки по умолчанию

##Объект options

Выглядит от примерно вот так:

```javascript
{

  applicationName: 'iDeus App',

  // default page before signUp/signIn
  defaultPage: '/',

  // default page after signUp/signIn
  specialPage: '/',

  // duration to animate pages
  slideDuration: 500,

  // default transition effect to change pages
  slideEffect: '',

  renderElement: '#app-main',

  menuHolder: '#app-menu',

  footerHolder: '#app-footer',

  mainContainer: '#app-container',

  popupsWrapper: '#app-popupWrap',

  popupOptions: {
    openClass: '-state_open',
    closeClass: '-state_close',
    fadeDuration: 200, // duration for popup close

    alertDefaults: {
      title(){
        return App.applicationName;
      },
      button: 'Ok',
      template(){
        return App.templates.alert
      }
    }
  }
}
```