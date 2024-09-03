import React, {useCallback, useEffect, useState} from "react";
import {sendToDB} from "../../functions/sendToDB";
import {
  CommandCorrect,
  commandValidator,
  isPhoneandNameCorrect,
  nameValidator,
  phoneValidator
} from "../../functions/correctPhoneandName";
import styles from "./Game.module.scss"
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

function Game() {
  // const ref = useRef()
  const [ip, setIp] = useState()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [command, setCommand] = useState("")
  const [query, setQuery] = useState({})
  const currentDate = new Date()

  const tg = window.Telegram.WebApp;

  useEffect(() => {

    const obj = {}
    decodeURI(new URLSearchParams(window.location.search).toString()).split("&").forEach(param => {
      const [name, parametr] = param.split("=")
      obj[name] = decodeURI(parametr)
    })
    setQuery(obj)
    if (obj.commandName) {
      setCommand(obj.commandName)
    }
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
      const responce = await sendToDB({name, phone, command, query, ip})
      if (responce.status === 200) {
        tg.close()
      }
    } catch (error) {

      console.log(error)
    }
  }, [name, phone, command, query])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    const phoneNameisCorrect = isPhoneandNameCorrect({phone, name})
    const comandName = query.commandMemberCount > 1 ? CommandCorrect(command) : true
    if (phoneNameisCorrect && comandName) {
      tgEnable(tg)
    } else {
      tgDisable(tg)
    }
  }, [phone, name, command, query])

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
              {query && query.commandMemberCount > 1 ?
                <>
                  <div className={styles.text}> Название команды (+ средний ранг):</div>
                  <MyInput
                    mytype={true}
                    val={command}
                    dis={!!query.commandName}
                    callBack={setCommand}
                    className={styles.name}
                    placeholder={"Название команды"}
                    validator={commandValidator}
                  />
                </>
                : <></>}
            </>
          }
        </div>
      </div>
    </div>
  )
    ;
}

export default Game;
