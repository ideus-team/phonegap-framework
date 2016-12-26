export default function(attr, validParam) {

  /**
   *  validate Methods
   *
   *  1. required [boolean]
   *  2. minlength [numeric]
   *  3. maxlength [numeric]
   *  4. email [boolean]
   *  5. min [numeric]
   *  6. max [numeric]
   *  7. number [numeric]
   *
   */

  let validateFunc = {

    required: function(modelKey, modelValue, validateValue){
      if (!modelValue) {
        return modelKey + ': обязательно для заполнения';
      }
    },

    minlength: function(modelKey, modelValue, validateValue){
      if (modelValue.length < validateValue) {
        return modelKey + ': должно быть не меньше ' + validateValue + ' символов';
      }
    },

    maxlength: function(modelKey, modelValue, validateValue){
      if (modelValue.length > validateValue) {
        return modelKey + ': должно быть не больше ' + validateValue + ' символов';
      }
    },

    email: function(modelKey, modelValue, validateValue){
      //if (modelValue) {
      //  return modelKey + 'is not empty';
      //}
    },

    min: function(modelKey, modelValue, validateValue){
      if (modelValue < validateValue) {
        return modelKey + ': должно быть не меньше ' + validateValue;
      }
    },

    max: function(modelKey, modelValue, validateValue){
      if (modelValue > validateValue) {
        return modelKey + ': должно быть не больше ' + validateValue;
      }
    }
  };

  let errorList = [];

  _.each(attr, function(attrValue, attrKey){
    if (validParam[attrKey]) {
      _.each(validParam[attrKey], function(value, key){
        let result = validateFunc[key](attrKey, attrValue, value);
        result && errorList.push(result);
      });
    }

  });

  if (errorList.length) {
    console.log(errorList);
    return errorList;
  }

}