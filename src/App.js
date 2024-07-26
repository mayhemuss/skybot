import {useCallback, useEffect, useRef, useState} from "react";
import {isPhoneandNameCorrect, nameValidator, phoneValidator} from "./functions/correctPhoneandName";
import {initSettings} from "./functions/renderSettings";
import {sendToDB} from "./functions/sendToDB";
import {getIdFromDB} from "./functions/getIdFromDB";

const img_url = "https://sun9-67.userapi.com/impg/xBY9oil2cE-POjprJJ9QqsjdOeuCgTipe426EA/gSczoqHqXgc.jpg?size=1080x1920&quality=96&sign=699dcb9fb53f3d24316c86dd27dafca0&type=album"

function App() {
  const ref = useRef()
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState({});

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    initSettings()
    const userdata = tg.initDataUnsafe
    getIdFromDB(userdata, tg)
    setData(userdata)
  }, [])


  const phoneHandler = (event) => {
    const value = event.target.value
    const isValid = phoneValidator(value, phone)
    setPhone(isValid)
  }

  const nameHandler = (event) => {
    const value = event.target.value
    const isValid = nameValidator(value)
    if (isValid) {
      setName(value)
    }
  }

  const onSendData = useCallback(async () => {
      try {
        const responce = await sendToDB({data, name, phone})
        if (responce.status === 200) {
          tg.close()
        } else {
          alert("что то пошло не так")
        }
      } catch (error) {
        alert("Что то пошло не так")
      }
    }
    , [name, phone, data])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    if (isPhoneandNameCorrect(phone, name)) {
      tg.MainButton.show()
      setTimeout(() => {
        window.scrollTo(0, ref.current.scrollHeight)
      }, 100)
    } else {
      tg.MainButton.hide()
    }
  }, [phone, name])

  return (
    < div
      className="App bigcontainer">
      < img
        className={"image"}
        src={"img_url"}
      />
      <div className={"container"}>
        <div className={"popup"}>
          <div style={{display: "flex"}}> Телефон:</div>
          <input
            value={phone}
            onChange={phoneHandler}
            className={"phone"}
            type={"tel"}
            placeholder={"89991234567"}
          />
          <div style={{display: "flex"}}> Ф.И.О.:</div>
          <textarea
            ref={ref}
            value={name}
            onChange={nameHandler}
            className={"name"}
            placeholder={"Ф.И.О. (кирилицей)"}
          />
        </div>
      </div>
    </div>
  )
    ;
}

export default App;
