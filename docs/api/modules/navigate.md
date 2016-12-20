#Navigate Module

Модуль предназначен для навигации между страницами приложения. Расширяет [App](../app.md) и доступен по ссылке ```App.navigate```.

Принимает два параметра ```fragment``` (хэш для роутера) и объект ```options``` (опции перехода между страницами).

## Options

У модуля есть опции по умолчанию

```javascript
{
  page: '/',
  trigger: true,
  direction: 'left',
  animationType: 'default',
  back: false,
  writable: true,
  static: false,
  previusView: {
    view: App.currentView,
    page: App.history && App.history.slice(-1)[0] ? App.history.slice(-1)[0].page : '/'
  }
}
```

Передаваемый параметр ```options``` дополняет и\или заменяет опции по умолчанию.