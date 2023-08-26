const Validator = function(options) {
  function validate(inputElement, rule) {
    const message = rule.test(inputElement.value)

    const messageOutput = inputElement.parentElement.querySelector(options.errorSelector)

    if (message) {
      messageOutput.innerText = message
      inputElement.parentElement.classList.add('invalid')
    } else {
      messageOutput.innerText = ''
      inputElement.parentElement.classList.remove('invalid')
    }

  }
  const formElement = document.querySelector(options.form)
  if (formElement) {
    options.rules.forEach(function(rule) {
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
Validator.isFullname = function(selector) {
  return {
    selector: selector,
    test: function(value) {
      return value.trim() ? undefined : 'Vui long nhap lai'
    }
  }
}
Validator.isEmail = function(selector) {
  return {
    selector: selector,
    test: function(value) {
      const regex = /^\S+@\S+\.\S+$/
      return regex.test(value) ? undefined : 'Vui long dien email'
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

