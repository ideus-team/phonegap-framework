module.exports = {
  include_file: {
    default_options: {
      cwd: '<%= inclDir %>' + '/',
      src: ['*.html'],
      cwd: '<%= destIncl %>' + '/',
    }
  }
};
