const Validator = function(options) {

  let selectorRules = {}
  function validate(inputElement, rule) {
    const errorElement = inputElement.parentElement.querySelector(options.errorSelector)
    let messageOutput

    let rules = selectorRules[rule.selector]

    for (var i = 0; i < rules.length; ++i) {
      messageOutput = rules[i](inputElement.value)
      if (messageOutput) break
    }
    if (messageOutput) {
      errorElement.innerText = messageOutput
      inputElement.parentElement.classList.add('invalid')
    } else {
      errorElement.innerText = ''
      inputElement.parentElement.classList.remove('invalid')
    }

  }
  const formElement = document.querySelector(options.form)
  if (formElement) {
    options.rules.forEach(function(rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test)
      } else {
        selectorRules[rule.selector] = [rule.test]
      }


      const inputElement = formElement.querySelector(rule.selector)
      const messageOutput = inputElement.parentElement.querySelector(options.errorSelector)
      inputElement.onblur = function() {
        validate(inputElement, rule)
      }

      inputElement.oninput = function() {
        messageOutput.innerText = ''
        inputElement.parentElement.classList.remove('invalid')
      }
    })
  }

}
Validator.isRequired = function(selector, message) {
  return {
    selector: selector,
    test: function(value) {
      return value.trim() ? undefined : message || 'feild nay la bat buoc'
    }
  }
}
Validator.isFullname = function(selector, message) {
  return {
    selector: selector,
    test: function(value) {
      return value.trim() ? undefined : message || 'Vui long nhap lai'
    }
  }
}
Validator.isEmail = function(selector, message) {
  return {
    selector: selector,
    test: function(value) {
      const regex = /^\S+@\S+\.\S+$/
      return regex.test(value) ? undefined : message || 'Vui long dien email'
    }
  }
}
Validator.minLengthPass = function(selector, min) {
  return {
    selector: selector,
    test: function(value) {
      return value.length > min ? undefined : `vui long nhap nhieu hon ${min} ky tu`
    }
  }
}
Validator.isConfirm = function(selector, valueConfirm, message) {
  return {
    selector: selector,
    test: function(valueText) {
      return valueText == valueConfirm() ? undefined : message || 'vui long nhap chinh xac xac nhan mat khau'
    }
  }
}

