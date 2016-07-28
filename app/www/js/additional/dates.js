define([], function(){

  var dates = {

    months: {
      ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },

    days: {
      ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      num: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    },

    getMonth: function(monthNum, ln){
      return {
        num: ( monthNum >= '10' ) ? monthNum : '0'+monthNum,
        name: this.months[ln][monthNum]
      };
    },

    getDay: function(dayNum, ln){
      return {
        num: ( dayNum >= '10' ) ? dayNum : '0'+dayNum,
        name: this.days[ln][dayNum]
      };
    },
  }
  
  return dates;
});