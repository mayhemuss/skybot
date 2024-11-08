import {BACK_URL} from "../urls";


export const sendToDB = async (query) => {
  try {

    console.log(query)

    const {ref,} = query


    const data = window.Telegram.WebApp.initDataUnsafe


      window.Telegram.WebApp.MainButton.disable()
      window.Telegram.WebApp.MainButton.setParams({
        color: "#888888",
        text: "Загрузка..."
      })


      const responce = await fetch(BACK_URL + `/regis`, {
        method: "POST",
        body: JSON.stringify({
          chatId: data.user.id,
          telegramName: data.user.first_name,
          username: data.user.username,
          registrationType: ref === data.user.id ? "capitan" : "user",
          ...query
        }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      console.log(responce)
      return responce;



  } catch (e) {
    console.log(e)
  }


}
