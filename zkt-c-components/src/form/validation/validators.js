import * as validators from 'vuelidate/lib/validators'

function regex(regex) {
  return validators.helpers.regex('regex', regex)
}

function compare(operator, prop, label) {
  var that = this

  return validators.helpers.withParams({
    type: 'compare',
    compare: label,
    operator: operatorTranslate(operator)
  }, function (value, parentVm) {
    var value = Number(value)
    var result = Number(validators.helpers.ref(prop, that, parentVm))
    switch (operator) {
      case '>':
        return value > result
        break
      case '<':
        return value < result
        break
      case '<=':
        return value <= result
        break
        case '>=':
          return value >= result
          break
      default:
        console.warn('未知的操作符')
        return false
    }
  })
}

function operatorTranslate (operator) {
  switch (operator) {
    case '>':
      return '大于'
      break
    case '>=':
      return '大于等于'
      break
    case '<':
      return '小于'
      break
    case '<=':
      return '小于等于'
      break
    default:
      console.warn('未知的操作符')
      return false
  }
}

export default {
  ...validators,
  regex,
  compare
}