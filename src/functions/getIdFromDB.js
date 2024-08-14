import {BACK_URL} from "../urls";


export const getIdFromDB = async (tg) => {
  const data = tg.initDataUnsafe
  try {
    const responce = await
      fetch(
        BACK_URL + `/type?id=${data.user.id}`, {
          method: "GET",
          headers: {'Access-Control-Allow-Origin': '*'}
        })

  } catch (error) {
    console.log(error)
  }
}
