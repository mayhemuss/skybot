import React, {useCallback, useEffect, useState} from "react";
import {sendToDB} from "../../functions/sendToDB";
import {
  CommandCorrect,
  commandValidator,
  NameIsCorrect,
  nameValidator,
  PhoneIsCorrect,
  phoneValidator
} from "../../functions/correctPhoneandName";
import styles from "./Iphone.module.scss"
import MyInput from "../../components/MyInput";
import {tgDisable, tgEnable, tgStart} from "../../functions/setTgButton";
import {getIdFromDB} from "../../functions/getIdFromDB";
import {backgroundsImg} from "../../images/backgroundsImg";


const test = {
  regText: "",
  callData: "",
  commandMemberCount: 1,
  ref: "",
  regType: "",
  commandName: "",
  capId: ""
}

function Iphone() {
  // const ref = useRef()
  const [ip, setIp] = useState()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [isPhonecorrect, setIsPhonecorrect] = useState(false);

  const [isNameCorrect, setIsNameCorrect] = useState(false);

  const [isCommandcorrect, setIsCommandcorrect] = useState();


  const [steamName, setSteamName] = useState("")
  const [query, setQuery] = useState({})
  const currentDate = new Date()

  const tg = window.Telegram.WebApp;

  useEffect(() => {
//
    const obj = {}
    decodeURI(new URLSearchParams(window.location.search).toString()).split("&").forEach(param => {
      const [name, parametr] = param.split("=")
      obj[name] = decodeURI(parametr)
    })
    setQuery(obj)

    tgStart(tg, obj)

    try {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => setIp(data.ip));
      getIdFromDB(tg).then(() => {
      })

    } catch (e) {
    }

  }, [])


  const onSendData = useCallback(async () => {
    try {
      const responce = await sendToDB({name, phone, steamName, query, ip})
      if (responce.status === 200) {
        tg.close()
      }
    } catch (error) {

      console.log(error)
    }
  }, [name, phone, steamName, query])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {

    const comandName = CommandCorrect(steamName)
    setIsNameCorrect(NameIsCorrect(name))
    setIsPhonecorrect(PhoneIsCorrect(phone))

    if (isPhonecorrect && isNameCorrect && comandName) {
      tgEnable(tg)
    } else {
      tgDisable(tg)
    }
  }, [phone, name, steamName, query])

  return (
    < div
      className={styles.bigcontainer}>
      <img
        className={styles.image}
        src={backgroundsImg[query?.callData?.split("_")[0]]}
        alt={"SkyNet"}
      />
      <div className={styles.container}>
        <div className={styles.popup}>
          {currentDate > query?.callData?.split("_")[1] ?
            <>
              <div className={styles.text}>Регистрация на мероприятие уже закончилась</div>
            </>
            : <>
              <div className={styles.text}> Телефон:</div>
              <MyInput
                mytype={false}
                val={phone}
                validator={phoneValidator}
                className={styles.phone}
                callBack={setPhone}
                placeholder={"89991234567"}
              />

              <div className={styles.text}> Ф.И.О.:</div>
              <MyInput
                mytype={true}
                val={name}
                callBack={setName}
                className={styles.name}
                placeholder={"Ф.И.О. (кирилицей)"}
                validator={nameValidator}
              />

              <div className={styles.text}>Ник в Steam</div>
              <MyInput
                mytype={true}
                val={steamName}
                callBack={setSteamName}
                className={styles.name}
                placeholder={"Ник в Steam"}
                validator={commandValidator}
              />

            </>
          }
        </div>
      </div>
    </div>
  )
    ;
}

export default Iphone;
