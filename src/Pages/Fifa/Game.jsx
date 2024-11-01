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

  useEffect(async () => {

    if (tg.initDataUnsafe !== undefined) {
      const obj = {}
      decodeURI(window.location.search).replaceAll("%20", " ").slice(1).split("&").forEach(param => {
        const [name, parametr] = param.split("=")
        obj[name] = parametr.replaceAll("%20", " ")
      })

      const {ref, callData} = obj

      console.log(ref)
      const response = await getIdFromDB(ref ? ref : tg.initDataUnsafe.user.id, callData, tg)

      console.log("responce___", response)
      setQuery({...obj, ...response})

      if (response.commandName) {
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

    await fetchWithRetry({name, phone, command, query, ip, rating}, 4, 1000)


  }, [name, phone, command, query, rating])

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
    const commandcorr = query.commandMemberCount > 1 ? CommandCorrect(query.commandName ? query.commandName : command) : true
    const ratingcorr = query.commandMemberCount > 1 ? CommandCorrect(rating) : true
    setIsNameCorrect(NameIsCorrect(name))
    setIsPhonecorrect(PhoneIsCorrect(phone))
    setIsRatingcorrect(CommandCorrect(rating))
    if (query.commandMemberCount > 1) {
      setIsCommandcorrect(CommandCorrect(query.commandName ? query.commandName : command))
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
              {query && query.commandMemberCount > 1 ?
                <>
                  <div className={styles.text}> Название команды:</div>
                  <MyInput
                    mytype={true}
                    val={query.commandName ? query.commandName : command}
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



            </>
          }
        </div>
      </div>
    </div>
  )
    ;
}

export default Game;
