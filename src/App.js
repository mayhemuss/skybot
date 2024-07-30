import {useCallback, useEffect, useRef, useState} from "react";
import {isPhoneandNameCorrect, nameValidator, phoneValidator} from "./functions/correctPhoneandName";
import {sendToDB} from "./functions/sendToDB";
import {getIdFromDB} from "./functions/getIdFromDB";
import MyInput from "./components/MyInput";

const img_url = "https://sun9-67.userapi.com/impg/xBY9oil2cE-POjprJJ9QqsjdOeuCgTipe426EA/gSczoqHqXgc.jpg?size=1080x1920&quality=96&sign=699dcb9fb53f3d24316c86dd27dafca0&type=album"
export const BACK_URL = "https://skynetgamesbot.ru/reg"

const oldUrl = "https://back.mayhemus.keenetic.pro/reg"
function App() {
  const ref = useRef()
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    console.log(tg)
    console.log("effect")
    tg.ready()
    getIdFromDB(tg)
  }, [])


  const onSendData = useCallback(async () => {
    try {
      const responce = await sendToDB({name, phone})
      if (responce.status === 200) {
        tg.close()
      } else {
        alert("что то пошло не так, попробуйте еще раз")
      }
    } catch (error) {
      alert("что то пошло не так, попробуйте еще раз")
      console.log(error)
    }
  }, [name, phone])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    if (isPhoneandNameCorrect(phone, name)) {
      tg.MainButton.enable()
      tg.MainButton.setParams({
        color: "rgb(105,179,45)"
      })
    } else {
      tg.MainButton.disable()
      tg.MainButton.setParams({
        color: "#888888"
      })
    }
  }, [phone, name])

  return (
    < div
      className="App bigcontainer">
      <img
        className={"image"}
        src={img_url}
        alt={"SkyNet"}
      />
      <div className={"container"}>
        <div className={"popup"}>
          <div style={{display: "flex"}}> Телефон:</div>
          <MyInput
            mytype={false}
            val={phone}
            validator={phoneValidator}
            className={"phone"}
            callBack={setPhone}
            placeholder={"89991234567"}
          />
          <div style={{display: "flex"}}> Ф.И.О.:</div>
          <div ref={ref}>
            <MyInput
              mytype={true}
              val={name}
              callBack={setName}
              className={"name"}
              placeholder={"Ф.И.О. (кирилицей)"}
              validator={nameValidator}
            />
          </div>
        </div>
      </div>
    </div>
  )
    ;
}

export default App;
