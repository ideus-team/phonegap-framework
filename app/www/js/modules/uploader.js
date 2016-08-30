define([], function(){
  
  return {

    destroyUploader: function (uploader) {
      if ( uploader ){
        uploader.removeEventListener('start', function(){}, false);
        uploader.removeEventListener('error', function(){}, false);
        uploader.removeEventListener('load', function(){}, false);
        uploader.removeEventListener('progress', function(){}, false);
        uploader.removeEventListener('complete', function(){}, false);
        uploader.destroy();
        uploader = null;
      } else {
        throw new Error('Uploader is not defined: file "uploader.js" in method "destroyUploader"');
      }
    },

  };
  
});

