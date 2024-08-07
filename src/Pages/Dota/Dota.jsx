import {useCallback, useEffect, useRef, useState} from "react";
import {getIdFromDB} from "../../functions/getIdFromDB";
import {sendToDB} from "../../functions/sendToDB";
import {isPhoneandNameCorrect} from "../../functions/correctPhoneandName";
import styles from "./Dota.module.scss"
import OneUser from "../../components/OneUser/OneUser";

const img_url = "https://sun9-78.userapi.com/impg/eT2Eu4QSbTHo6Pa7SDjzqC8mRb2sPzdMnxOfMw/V99f8Bg6MAU.jpg?size=800x1399&quality=96&sign=0b42620c7a2969625b9a10cac949bc3b&type=album"
const initialCommand = {
  "Участник 1": {phone: "", name: ""},
  "Участник 2": {phone: "", name: ""},
  // "Участник 3": {phone: "", name: ""},
  // "Участник 4": {phone: "", name: ""},
  // "Участник 5": {phone: "", name: ""},
}

function Dota() {
  const ref = useRef()

  const [command, setCommand] = useState(initialCommand)
  // const [phone, setPhone] = useState("");
  // const [name, setName] = useState("");
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

export default Dota;
