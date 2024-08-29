export const getIdFromDB = async (tg) => {
  const data = tg.initDataUnsafe
  try {
    const responce = await
      fetch(
        'http://45.12.229.64/reg/type', {
          method: "POST",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: data.user.id})
        })
    return responce.json()
  } catch (error) {
    console.log(error)
  }
}
