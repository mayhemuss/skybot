import {BACK_URL} from "../urls";


export const sendToDB = async ({name, phone, command,steamName, query, ip}) => {
  try {

    const {
      callData,
      commandMemberCount,
      ref,
      regType,
      capId
    } = query
    const data = window.Telegram.WebApp.initDataUnsafe
    const text = window.Telegram.WebApp.MainButton.text
    if (data.user.id) {
      window.Telegram.WebApp.MainButton.disable()
      window.Telegram.WebApp.MainButton.setParams({
        color: "#888888",
        text: "Загрузка..."
      })

      const date = new Date().toLocaleString("ru-RU", {timeZone: 'Europe/Moscow'})
      const responce = await fetch(BACK_URL + `/regis`, {
        method: "POST",
        body: JSON.stringify({
          date,
          phone,
          name,
          subscribe: "да",
          chatId: data.user.id,
          tname: data.user.first_name,
          username: data.user.username,
          regType,
          ref,
          callData,
          commandName: commandMemberCount > 1 ? command : null,
          ip,
          capId,
          steamName
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      console.log(responce)
      return responce;
    } else {
      window.Telegram.WebApp.MainButton.enable()
      window.Telegram.WebApp.MainButton.setParams({
        color: "rgb(105,179,45)",
        text
      })

    }


  } catch (e) {
    console.log(e)
  }


}
