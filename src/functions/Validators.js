class Validators{
  phoneValidator(phone, currentPhone, reg, maxCheck) {
    const regexp = /\d/g
    if (phone.length === 1 && phone[0] !== "9") {
      return "8"
    }
    if (phone.length === 1 && phone[0] === "9") {
      return "89"
    }
    for (let i = 0; i < phone.length; i++) {
      regexp.lastIndex = 0
      if (!regexp.test(phone[i]) || phone.length >= maxCheck) {
        return currentPhone
      }
    }
    return phone
  }

  nameValidator(name, currentName) {
    const regexp = /^[а-я\s]+$/gi

    if (name.length > 40) {
      return currentName
    }

    if (!regexp.test(name)) {
      return currentName
    }


    return name
  }

  NameIsCorrect(name) {
    return name.length > 7
  }

  PhoneIsCorrect(phone) {
    return phone.length === 11
  }

  otherCorrect(value, lenght) {
    return value.length >= lenght
  }

  otherValidator(newText, oldText, regexp, maxCheck) {

    if (newText.length > maxCheck) {
      return oldText
    }
    const reg = new RegExp(regexp, "gi")
    // reg.lastIndex = 0
    if (newText === "") {
      return newText
    }
    const validText = !reg.test(newText)
    if (validText) {
      return oldText
    }

    return newText
  }

}

export default new Validators()












