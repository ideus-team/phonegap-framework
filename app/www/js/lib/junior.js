var Jr = Jr || {};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

define(['jquery', 'modernizr', 'underscore', 'Backbone'], function($, Modernizr, _, Backbone){
  Jr.View = Backbone.View.extend({
    delegateEvents: function(events) {
      var key, newKey, oldValue;
      this.events = this.events || events;
      for (key in this.events) {
        if (key.indexOf('click') === 0) {
          if (Modernizr.touch) {
            newKey = key.replace('click', 'touchend');
            oldValue = this.events[key];
            this.events[newKey] = oldValue;
            delete this.events[key];
          }
        }
      }
      return Backbone.View.prototype.delegateEvents.call(this, this.events);
    }
  });

  Jr.Navigator = {
    backButtonFlag: true,
    history: [],
    directions: {
      UP: 'UP',
      DOWN: 'DOWN',
      LEFT: 'LEFT',
      RIGHT: 'RIGHT'
    },
    opposites: {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT'
    },
    animations: {
      SLIDE_STACK: 'SLIDE_STACK',
      SLIDE_OVER: 'SLIDE_OVER'
    },
    navigate: function(url, opts) {
      Jr.Navigator.history.push(opts);
      Jr.Navigator.backButtonFlag = false;
      return Backbone.history.navigate(url, opts);
    },

    container: $('#app-container'),

    renderView: function(mainEl, view) {
      var animation, newEl;
      animation = Jr.Navigator.history.length > 0 ? Jr.Navigator.history[Jr.Navigator.history.length -1].animation : null;
      if (animation) {
        var fragment = Backbone.history.getFragment();
        newEl = $('<div class="b-viewHolder -view_'+fragment+'"></div>');
        Jr.Navigator.resetContent(newEl, view);
        Jr.Navigator.normalRenderView(newEl, view);
        setTimeout(function() {
          Jr.Navigator.animate(mainEl, newEl, animation.type, animation.direction);
          Jr.Navigator.afterAnimation();
        }, 1000);
      } else {
        Jr.Navigator.resetContent(mainEl, view);
        Jr.Navigator.normalRenderView(mainEl, view);
        setTimeout(function(){
          $('body').removeClass('g-loading');
        }, 50);
      }
    },
    normalRenderView: function(mainEl, view) {
      mainEl.append(view.render().el);
    },
    resetContent: function(mainEl) {
      var fragment = Backbone.history.getFragment();
      $(mainEl).addClass('b-viewHolder -view_'+fragment+'');
      return mainEl.html('');
    },
    afterAnimation: function() {
      var animation, opposite;
      var lastNavigate = Jr.Navigator.history.pop();
      animation = lastNavigate.animation;
      opposite = Jr.Navigator.opposites[animation.direction];
      lastNavigate.animation.direction = opposite;
      Jr.Navigator.history.push(lastNavigate);
      if(Jr.Navigator.backButtonFlag) {
        Jr.Navigator.history.pop();
      }
      Jr.Navigator.backButtonFlag = true;
    },
    animate: function(fromEl, toEl, type, direction) {
      $('body').removeClass('g-loading');
      if (Jr.Navigator.animations.hasOwnProperty(type)) {
        return Jr.Navigator.doAnimation(fromEl, toEl, type, direction);
      } else {
        throw Error("Animation Not Available");
      }
    },
    doAnimation: function(fromEl, toEl, type, direction) {
      var after, next, $this = this;
      $this.container.prepend(toEl);
      toEl.addClass('animate-to-view').addClass(direction).addClass('initial');
      $this.container.addClass('animate');
      $this.container.addClass(direction);
      next = function() {
        return toEl.removeClass('initial');
      };
      setTimeout(next, 1);
      after = function() {
        fromEl.remove();
        toEl.attr('id', 'app-main');
        toEl.removeClass('animate-to-view').removeClass(direction);
        return $this.container.removeClass('animate').removeClass(direction);
      };
      return setTimeout(after, 400);
    }
  };

  Jr.Router = Backbone.Router.extend({
    renderView: function(view, elem) {
      return Jr.Navigator.renderView($(elem), view);
    }
  });
  return Jr;
});