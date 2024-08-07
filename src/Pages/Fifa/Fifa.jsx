import {useCallback, useEffect, useRef, useState} from "react";
import {getIdFromDB} from "../../functions/getIdFromDB";
import {sendToDB} from "../../functions/sendToDB";
import {isPhoneandNameCorrect} from "../../functions/correctPhoneandName";
import styles from "./Fifa.module.scss"
import OneUser from "../../components/OneUser/OneUser";

const img_url = "https://sun9-67.userapi.com/impg/xBY9oil2cE-POjprJJ9QqsjdOeuCgTipe426EA/gSczoqHqXgc.jpg?size=1080x1920&quality=96&sign=699dcb9fb53f3d24316c86dd27dafca0&type=album"

const initialCommand = {
  "Участник 1": {phone: "", name: ""},
}

function Fifa() {
  const ref = useRef()

  const [command, setCommand] = useState(initialCommand)

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    console.log(tg)
    console.log("effect")
    tg.ready()
    getIdFromDB(tg)
  }, [])


  const onSendData = useCallback(async () => {
    try {
      const responce = await sendToDB(command)
      if (responce.status === 200) {
        tg.close()
      } else {
        alert("что то пошло не так, попробуйте еще раз")
      }
    } catch (error) {
      alert("что то пошло не так, попробуйте еще раз")
      console.log(error)
    }
  }, [command])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    if (Object.keys(command).map(user => isPhoneandNameCorrect(command[user])).includes(false)) {
      console.log(false)
      tg.MainButton.disable()
      tg.MainButton.setParams({
        color: "#888888"
      })
    } else {
      console.log(true)
      tg.MainButton.enable()
      tg.MainButton.setParams({
        color: "rgb(105,179,45)"
      })
    }
  }, [command])

  return (
    < div
      className={styles.bigcontainer}>
      <img
        className={styles.image}
        src={img_url}
        alt={"SkyNet"}
      />
      <div className={styles.container}>
        <div className={styles.popup}>
          {Object.keys(command).map(user => {
            return <OneUser command={command} user={user} callBack={setCommand} key={user}/>
          })}

        </div>
      </div>
    </div>
  )
    ;
}

export default Fifa;
