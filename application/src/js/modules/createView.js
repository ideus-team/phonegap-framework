import promise from './promise';

export default {

  create(view, el) {
    this.el = el;
    this.view = view;
    this.html = view.render().el.outerHTML;
    this.container = document.querySelector(App.options.mainContainer);
    this._subContainer = document.createElement('div');
    this._subContainer.classList = 'b-subContainer js-subContainer';
    this._subContainer.setAttribute('id', 'app-subContainer');
    this._subContainer.innerHTML = this.html;
    this.container.appendChild(this._subContainer);
    return this.animateView();
  },

  animateView(){

    return setTimeout(() => {
      $(this.container).addClass('-state_animate');
      return setTimeout(this.stableView.bind(this), 2000);

      
    }, 10);
  },

  stableView(){
    this.el.empty();
    this.el.append(this.html);
    this._subContainer.remove();
    $(this.container).removeClass('-state_animate');
    return true;
  }

}