export const phoneValidator = (phone, currentPhone) => {
  const regexp = /\d/g
  if (phone.length === 1 && phone[0] !== "9") {
    return "8"
  }
  if (phone.length === 1 && phone[0] === "9") {
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


export const nameValidator = (name, currentName) => {
  const regexp = /[а-я\s]/gi

  for (let i = 0; i < name.length; i++) {
    regexp.lastIndex = 0
    if (!regexp.test(name[i]) || name.length > 40) {
      return currentName
    }
  }
  return name
}

export const commandValidator = (name, currentName) => {
  if (name.length > 40) {
    return currentName
  }
  return name
}


export const isPhoneandNameCorrect = (user) => {
  const {phone, name} = user
  console.log(user)
  return phone.length === 11 && name.length > 7;

}


export const CommandCorrect = (command) => {
  return command.length >= 1
}
