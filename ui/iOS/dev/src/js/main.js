// Authors: I. Syrov

$(function() {
  leftPanel();
  popoverMenu();

  if ($('html').hasClass('-device_desktop')) {

  }
});
$(window).resize(function() {

});
$(window).load(function() {

});


function leftPanel(){
  $('.js-openPanel').on('click', function(e){
    e.preventDefault();
    $('.b-wrapper').toggleClass('-panel-left-cover');
    $('.b-overlay.-type_pannel').show();
  });
  $('.b-overlay.-type_pannel').on('click', function(){
    $(this).hide();
    $('.b-wrapper').removeClass('-panel-left-cover');
  });
}

function popoverMenu(){
  $('.js-popoverMenu').on('click', function(e){
    e.preventDefault();

    $('.b-overlay').toggleClass('-state_visible');
    $('.b-popover.-type_popoverMenu').addClass('-type_modalIn').show();
  });
  $('.b-overlay').on('click', function(){
    $(this).removeClass('-state_visible');
    $('.b-popover.-type_popoverMenu').removeClass('-type_modalIn').hide();
  });
}