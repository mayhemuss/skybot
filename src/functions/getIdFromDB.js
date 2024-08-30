import {BACK_URL} from "../urls";

export const getIdFromDB = async (tg) => {
  const data = tg.initDataUnsafe
  try {
    const responce = await
      fetch(
        BACK_URL + '/type', {
          method: "POST",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: data.user.id})
        })
    return responce
  } catch (error) {
    console.log(error)
  }
}
