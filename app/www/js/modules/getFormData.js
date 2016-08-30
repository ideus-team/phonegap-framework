define([], function(){
  
  return function(form){
    var o = {};
    var a = form.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || undefined);
        } else {
          o[this.name] = this.value || undefined;
        }
    });
    return o;
  };
  
});