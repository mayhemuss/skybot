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


  const [isPhonecorrect, setIsPhonecorrect] = useState(false);

  const [isNameCorrect, setIsNameCorrect] = useState(false);

  const [isCommandcorrect, setIsCommandcorrect] = useState(false);
  const [isRatingcorrect, setIsRatingcorrect] = useState(false);


  const [command, setCommand] = useState("")
  const [rating, setRating] = useState("")
  const [query, setQuery] = useState({})
  const currentDate = new Date()

  const tg = window.Telegram.WebApp;

  useEffect(() => {

    const obj = {}
    decodeURI(window.location.search).replaceAll("%20", " ").slice(1).split("&").forEach(param => {
      const [name, parametr] = param.split("=")
      obj[name] = parametr.replaceAll("%20", " ")
    })
    setQuery(obj)
    if (obj.commandName) {
      setCommand(obj.commandName)
    }
    tgStart(tg, obj)

  }, [])

  useEffect(() => {
    try {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => setIp(data.ip));
      getIdFromDB(tg).then(() => {
      })

    } catch (e) {
      console.log(e)
    }
  }, [])


  const onSendData = useCallback(async () => {
    try {
      const responce = await sendToDB({name, phone, command, query, ip, rating})
      if (responce.status === 200) {
        tg.close()
      }
    } catch (error) {

      console.log(error)
    }
  }, [name, phone, command, query, rating])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    const namecorr = NameIsCorrect(name)
    const phonecorr = PhoneIsCorrect(phone)
    const commandcorr = query.commandMemberCount > 1 ? CommandCorrect(command) : true
    const ratingcorr = query.commandMemberCount > 1 ? CommandCorrect(rating) : true
    setIsNameCorrect(NameIsCorrect(name))
    setIsPhonecorrect(PhoneIsCorrect(phone))
    setIsRatingcorrect(CommandCorrect(rating))
    if (query.commandMemberCount > 1) {
      setIsCommandcorrect(CommandCorrect(command))
    } else {
      setIsCommandcorrect(true)
    }

    if (namecorr && phonecorr && commandcorr && ratingcorr) {
      tgEnable(tg)
    } else {
      tgDisable(tg)
    }
  }, [phone, name, command, query, rating])

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
                check={isPhonecorrect}
              />

              <div className={styles.text}> Ф.И.О.:</div>
              <MyInput
                mytype={true}
                val={name}
                callBack={setName}
                className={styles.name}
                placeholder={"Ф.И.О. (кирилицей)"}
                validator={nameValidator}
                check={isNameCorrect}
              />
              {query && query.commandMemberCount > 1 ?
                <>
                  <div className={styles.text}> Название команды:</div>
                  <MyInput
                    mytype={true}
                    val={command}
                    dis={!!query.commandName}
                    callBack={setCommand}
                    className={styles.name}
                    placeholder={"Название команды"}
                    validator={commandValidator}
                    check={isCommandcorrect}
                  />
                  <div className={styles.text}>Ваш рейтинг в игре:</div>
                  <MyInput
                    mytype={true}
                    val={rating}
                    // dis={!!query.rating}
                    callBack={setRating}
                    className={styles.name}
                    placeholder={"Ваш рейтинг"}
                    validator={commandValidator}
                    check={isRatingcorrect}
                  />
                </>
                : <></>}
              {/*<button onClick={() => onSendData()}>send</button>*/}
            </>
          }
        </div>
      </div>
    </div>
  )
    ;
}

export default Game;
