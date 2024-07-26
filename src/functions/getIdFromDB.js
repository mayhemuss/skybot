export const getIdFromDB = async (tg) => {

  const data = tg.initDataUnsafe
  try {
    setTimeout(async () => {
      if (data?.user?.id !== undefined) {
        const responce = await
          fetch(
            `https://hook.eu2.make.com/fs6us31i7kcvxx6q6w45bkpvhny9ob4i?chatId=${data.user.id}`, {
              method: "GET",
            })
        const result = await responce.json()
        const type = result.types ? "Изменить данные" : "Зарегистрироваться"
        tg.MainButton.setParams({
          text: type,
          color: "rgb(105,179,45)"
        })
      } else {
        tg.MainButton.setParams({
          text: "Зарегистрироваться",
          color: "rgb(105,179,45)"
        })
      }
    }, 1000)
  } catch (error) {
    console.log(error)
  }


}
