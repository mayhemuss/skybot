export const phoneValidator = (phone, currentPhone) => {
  const regexp = /\d/g
  if (phone.length === 1 && phone[0]!=="9"){
    return "8"
  }
  if (phone.length === 1 && phone[0]==="9"){
    return "89"
  }
  for (let i = 0; i < phone.length; i++) {
    regexp.lastIndex = 0
    if (!regexp.test(phone[i]) || phone.length >= 12) {
      return currentPhone
    }
  }
  return phone
}


export const nameValidator = (name) => {
  const regexp = /[0-9a-z]/gi

  for (let i = 0; i < name.length; i++) {
    regexp.lastIndex = 0
    if (regexp.test(name[i]) || name.length > 40) {
      return false
    }
  }
  return true
}


export const isPhoneandNameCorrect = (phone, name) => {
  if (phone.length === 11 && name.length > 7) {
    return true
  }
  return false
}

const phone = "+7(917)321-58-02"
