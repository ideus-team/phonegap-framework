/*
  Что хотелось бы в модуле?

  1. Возможность вызывать попап по названию
  2. Возможность передавать в попап данные
  3. Попапы для alert, confirm, prompt (возможность задавать звуки при открытии\закрытии)
 */

import Views from '../common/views/mainViews';

export default class Popup {

  /* 
    Open popup function
    id: popup id, name of the template
  */
  open(id, settings = {}){
    
    if ( !id ) {
      throw Error('Popup id is not defined');
      return;
    }
    
    return new Promise((resolve, reject) => {
      this.view = new Views[id]();
      App.isPopupOpen = true;
      log([`Popup id: ${id}`, settings], 'black', `Popup:open`);
      resolve(this.view);
    });

  }

  close(){

    return new Promise((resolve, reject) => {
      let popup = this;
      if ( App.isPopupOpen ){
        $(App.options.popupsWrapper)
        .fadeOut(App.options.popupOptions.fadeDuration, () => {
          $(App.options.popupsWrapper)
            .removeClass(App.options.popupOptions.openClass)
            .removeAttr('style');

          log(['Close all popups'], 'black', `Popup:close`);
          resolve(popup);
        });
      } else {
        App.isPopupOpen = false;
        resolve(popup);
      }
    });

  }

  /*
    Alert
   */
  alert(message, title, button, callback){
    return new Promise((resolve, reject) => {
      if ( !message ) { reject('No message for alert'); }
      this.view = new Views['alert']({
        button: button || 'Ok',
        title: title || App.options.applicationName,
        message: message,
        callback: callback
      });

      App.isPopupOpen = true;

      log([`Message: ${message}`, `Title: ${title}`, `Button: ${button}`, callback], 'black', `Popup:alert`);
      resolve(this.view);
    });
  }

  prompt(title, defaultInput, ok, cancel, callback){
    let popup = this;

    return new Promise((resolve, reject) => {
      popup.view = new Views['prompt']({
        defaultInput: defaultInput || null,
        buttonOk: ok || 'Ok',
        buttonCancel: cancel || 'Cancel',
        title: title || App.options.applicationName,
        callback: callback
      });
      popup.view.resolve = resolve;
      popup.view.reject = reject;

      App.isPopupOpen = true;

      log(
        [
          `DefaultInput: ${popup.view.initData.defaultInput}`,
          `Title: ${popup.view.initData.title}`,
          `Button Ok: ${popup.view.initData.buttonOk}`,
          `Button cancel: ${popup.view.initData.buttonCancel}`,
          callback
        ],
        'black',
        `Popup:prompt`
      );
    });
  }

}