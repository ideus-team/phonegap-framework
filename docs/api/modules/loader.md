#Loader module

Данный модуль служит для манипуляции спиннером(и) в приложении. Модуль заточен так, что можно добавлять спиннеры как на всё приложение, так и на отдельные блоки и элементы.

##Методы и опции модуля:

Имя    | Описание
------------ | -------------
element      | По умолчанию, модуль использует этот элемент, чтобы навешивать и удалять глобальный класс для спиннера
class      | Глобальный класс в css для спиннера
show      | Метод, который принимает два параметра ```element``` и ```_class```. Если данные параметры не переданы, то модуль берет ```element``` по умолчанию и добавляет к нему ```class``` по умолчанию.
hide      | Метод, который принимает два параметра ```element``` и ```_class```. Если данные параметры не переданы, то модуль берет ```element``` по умолчанию и удаляет с него ```class``` по умолчанию.