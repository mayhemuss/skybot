export const sendToDB = async ({data, name, phone}) => {
  if (data.user.id) {
    const date = new Date().toLocaleString("ru-RU", {timeZone: 'Europe/Moscow'})
    const responce = await fetch("https://hook.eu2.make.com/2ifh78qfby2295jfdcbud5s8xf2vqtbk", {
      method: "POST",
      body: JSON.stringify({
        date,
        phone,
        name,
        subscribe: "да",
        chatId: data.user.id,
        tname: data.user.first_name,
        username: data.user.username
      })
    })
    return responce;
  } else {
    throw new Error({message: "все поломалось"})
  }
}
