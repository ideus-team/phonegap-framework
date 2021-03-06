export default function(attr, validParam = {}, modelName) {

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

  for (let attrKey in attr) {
    let param = validParam[attrKey];
    if (param) {
      for (let key in param) {
        let result = validateFunc[key](attrKey, attr[attrKey], param[key]);
        result && errorList.push(result);
      }
    }
  }

  if (errorList.length) {
    console.log(errorList);
    log(errorList, 'black', `validateModel: ${modelName} `);
    return errorList;
  }

}