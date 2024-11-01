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
import {tgDisable, tgEnable} from "../../functions/setTgButton";
import {getIdFromDB} from "../../functions/getIdFromDB";


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

  const [ip, setIp] = useState()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [isPhonecorrect, setIsPhonecorrect] = useState(false);

  const [isNameCorrect, setIsNameCorrect] = useState(false);

  const [isCommandcorrect, setIsCommandcorrect] = useState(false);


  const [steamName, setSteamName] = useState("")
  const [query, setQuery] = useState({})
  const currentDate = new Date()

  const tg = window.Telegram.WebApp;

  useEffect(async() => {

    if (tg.initDataUnsafe) {
      const obj = {}
      decodeURI(window.location.search).replaceAll("%20", " ").slice(1).split("&").forEach(param => {
        const [name, parametr] = param.split("=")
        obj[name] = parametr.replaceAll("%20", " ")
      })

      const {ref, callData} = obj
      const response = await getIdFromDB(ref, callData, tg)


      setQuery({...obj, ...response})

      if (obj.commandName) {
        setCommand(obj.commandName)
      }

      tg.ready()



      console.log({...obj, ...response})
    }

  }, [tg])

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
    async function fetchWithRetry(quer, retries = 3, delay = 1000) {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await sendToDB(quer)

          // Если запрос успешен, возвращаем результат
          if (response.status === 200) {
            console.log("done")
            return tg.close()
          } else {
            throw new Error(`Ошибка HTTP: ${response.status}`);
          }
        } catch (error) {
          if (i < retries - 1) {
            console.log(`Попытка ${i + 1} не удалась. Повтор через ${delay} мс.`);
            await new Promise(res => setTimeout(res, delay)); // Ждем перед повторной попыткой
          } else {
            console.error('Все попытки исчерпаны. Ошибка:', error);
            throw error; // Пробрасываем ошибку, если это была последняя попытка
          }
        }
      }
    }

    await fetchWithRetry({name, phone, steamName, query, ip}, 4, 1000)







  }, [name, phone, steamName, query])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.show()
    tg.MainButton.setParams({
      text: query.regText,
      color: "#888888"
    })
  }, [query]);

  useEffect(() => {
    const namecorr = NameIsCorrect(name)
    const phonecorr = PhoneIsCorrect(phone)
    const commandcorr = CommandCorrect(steamName)
    setIsNameCorrect(NameIsCorrect(name))
    setIsPhonecorrect(PhoneIsCorrect(phone))

    setIsCommandcorrect(CommandCorrect(steamName))


    if (namecorr && phonecorr && commandcorr) {
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
        src={query.inAppimageUrl}
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

              <div className={styles.text}>Ник в Steam</div>
              <MyInput
                mytype={true}
                val={steamName}
                callBack={setSteamName}
                className={styles.name}
                placeholder={"Ник в Steam"}
                validator={commandValidator}
                check={isCommandcorrect}
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
