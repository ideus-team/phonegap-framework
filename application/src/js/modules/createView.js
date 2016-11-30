import promise from './promise';

export default module = {

  animateClass: '-state_animate',
  doAnimationClass: '-do_animation',

  create(view, el) {

    this._options = App.navigateOptions;

    this.view = view;
    this.el = el;
    this.view = view;

    console.log(this._options);


    this.view.init && this.view.init();
    // if we render without options
    if ( !this._options ) {

      return this.renderStaticView();

    } else {

      this.animType =  module.animations[this._options.animationType] || module.animations.default;
      this.dir = this.animType.directions[this._options.direction] || this.animType.directions.left;

      this.container = document.querySelector(App.options.mainContainer);
      this._subContainer = document.createElement('div');
      this._subContainer.classList = 'b-subContainer js-subContainer';
      this._subContainer.setAttribute('id', 'app-subContainer');
      this._subContainer.innerHTML = this.view.el.innerHTML;
      this.container.appendChild(this._subContainer);
      return this.animateView();

    }
  },

  animateView(){
    $(this.container)
      .addClass(module.animateClass);
    this.el
      .addClass(this.animType.class)
      .addClass(!this._options.back ? this.dir.class : this.dir.backClass);
    $(this._subContainer).addClass(!this._options.back ? this.dir.class : this.dir.backClass);
    return setTimeout(() => {
      $(this._subContainer).addClass(this.animType.class);
      $(this.container).addClass(module.doAnimationClass);
      return setTimeout(this.stableView.bind(this), this.animType.duration);
    }, 10);
  },

  stableView(){

    // add classes to app-main (element that will be our new view)
    this.el
      .empty()
      .append(this.view.el)
      .removeClass(this.animType.class)
      .removeClass(!this._options.back ? this.dir.class : this.dir.backClass);

    this._subContainer.remove();

    // remove classes from main container
    $(this.container)
      .removeClass(module.animateClass)
      .removeClass(module.doAnimationClass)
      .removeClass(!this._options.back ? this.dir.class : this.dir.backClass);
    $(this._subContainer).removeClass(this.animType.class);

    this.afterRender();
  },

  renderStaticView(){
    this.el.empty();
    this.el.append(this.view.el);

    this.afterRender();
  },

  afterRender(){
    this.view.afterRender && this.view.afterRender();
    App.currentView = this.view;
    App.history[App.history.length-1].previusView.view = App.currentView;
  },

  animations: {
    /* default animation */
    default: {
      class: '-default_animation',
      duration: 400,
      directions: {

        left: {
          class: '-animate_left',
          backClass: '-animate_right'
        },

        right: {
          class: '-animate_right',
          backClass: '-animate_left'
        },

        up: {
          class: '-animate_up',
          backClass: '-animate_down'
        },
        
        down: {
          class: '-animate_down',
          backClass: '-animate_up'
        }

      }
    }
    /* default animation end */
  }

}