import {BACK_URL} from "../urls";


export const getIdFromDB = async (tg) => {

  const data = tg.initDataUnsafe
  try {
    setTimeout(async () => {
      if (data?.user?.id !== undefined) {
        const responce = await
          fetch(
            BACK_URL+`/type?id=${data.user.id}`, {
              method: "GET",
              headers: {'Access-Control-Allow-Origin': '*'}
            })
        const result = await responce.json()
        tg.MainButton.disable()
        tg.MainButton.show()
        const type = result.types ? "Изменить данные" : "Зарегистрироваться"
        tg.MainButton.setParams({
          text: type,
          color: "#888888"
        })
      } else {
        tg.MainButton.setParams({
          text: "Зарегистрироваться",
          color: "#888888"
        })
      }
    }, 1000)
  } catch (error) {
    console.log(error)
    tg.MainButton.setParams({
      text: "Зарегистрироваться",
      color: "#888888"
    })
  }


}
