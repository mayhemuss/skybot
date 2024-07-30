import {BACK_URL} from "../App";

export const sendToDB = async ({name, phone}) => {
  const data = window.Telegram.WebApp.initDataUnsafe
const text = window.Telegram.WebApp.MainButton.text
  if (data.user.id) {
    window.Telegram.WebApp.MainButton.disable()
    window.Telegram.WebApp.MainButton.setParams({
      color: "#888888",
      text : "Загрузка..."
    })
    const date = new Date().toLocaleString("ru-RU", {timeZone: 'Europe/Moscow'})
    const responce = await fetch(BACK_URL+`/regis?date=${date}&phone=${phone}&name=${name}&subscribe=да&chatId=${data.user.id}&tname=${data.user.first_name}&username=${data.user.username}`, {
      method: "POST",
    })
    return responce;
  } else {
    window.Telegram.WebApp.MainButton.enable()
    window.Telegram.WebApp.MainButton.setParams({
      color: "rgb(105,179,45)",
      text
    })
    throw new Error({message: "все поломалось"})
  }
}
