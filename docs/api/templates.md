#Templates

Очень важный компонент приложения. В нем находится все HTML разметка нашего приложения. Все данные, которые вы передаете в template выводятся с помощью [underscore.js](http://underscorejs.org/)

Для удобаства gulp следит за папкой common/templates/ и всеми файлами, которые там создаются\удаляются\редактируются и каждый раз пересобирает их в файл `templates.js`. Далее все Ваши шаблоны доступны в этом файле как объект с функциями.

Мы сразу подключаем все шаблоны в App, таким образом расщиряя его. Далее все шаблоны, которые были созданы, доступны по ссылке `App.templates`

##Example

Если рассмотреть часный случай, когда нам нужно изолироваться от App и достать шаблон прям из template.js, то мы можем сделать так:

```javascript

import * as templates from './common/templates/templates';

Register.view('home', {

  template: templates.homeTemplate

});

```
Если есть потребность не используя view достать какой-либо шаблон, прокинуть в него объект с данными и отрисовать в каком-то месте представления, то можно сделать следующее:

```javascript
function myFn(template, element, someData){
  let tpl = template(data);
  $(htmlNode).html(tpl);
}
```

В таком случае, внутри нашего шаблона все данные будут доступны через объект `data`. Давайте вызовем функцию, передадим параметры:

```javascript
import * as templates from './common/templates/templates';

myFn(templates.like, '.js-likeHolder', {count: 10, isActive: true});
```

В шаблоне у нас следующее:

```html
<div class="b-likes">
  <span class="b-likes__icon <%= data.isActive ? '-state_active' : '' %>"></span>
  <%= data.count %>
</div>
```