import React, {useCallback, useEffect, useState} from "react";
import styles from "./Game.module.scss"
import MyInput from "../../components/MyInput/MyInput";
import {tgDisable, tgEnable} from "../../functions/setTgButton";
import {useDispatch, useSelector} from "react-redux";
import {
  queryThunk,
  getFields,
  getIsLoading,
  getInAppimageUrl,
  getRegText,
  queryActions,
  getCallData, getRef
} from "../../slice/query";
import {fetchWithRetry} from "../../functions/fetchWithRetry";
import {fieldsActions, getObj} from "../../slice/fields";
import {Spinner} from "../Spinner/Spinner";
import {getIp} from "../../functions/getIp";
import Validators from "../../functions/Validators";


function Game() {
  const dispatch = useDispatch()
  const Fields = useSelector(getFields)
  const isLoading = useSelector(getIsLoading)
  const inAppimageUrl = useSelector(getInAppimageUrl)
  const regText = useSelector(getRegText)
  const finalData = useSelector(getObj)
  const call = useSelector(getCallData)
  const reff = useSelector(getRef)

  const [Data, setData] = useState(+(new Date(2300, 1, 1)))
  const currentDate = new Date()

  const [checked, setChecked] = useState(false)

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    (async () => {
      if (tg.initDataUnsafe !== undefined) {
        const obj = {}
        decodeURI(window.location.search).replaceAll("%20", " ").slice(1).split("&").forEach(param => {
          const [name, parametr] = param.split("=")
          obj[name] = parametr.replaceAll("%20", " ")
        })

        const {ref, callData} = obj

        setData(callData?.split("_")[1])

        tg.ready();

        dispatch(queryActions.setCallData(callData))
        dispatch(queryActions.setRef(+ref))

        dispatch(queryThunk({
          callData,
          ref: +ref,
          chatId: tg.initDataUnsafe.user.id
        }))
      }
    })()


  }, [tg])

  useEffect(() => {
    (async () => {
      const data = await getIp(5, 1200)
      await dispatch(fieldsActions.setparams({validVal: data.ip, isChecked: true, name: "ip"}))
    })()
  }, [])


  const onSendData = useCallback(async () => {

    const data = {}
    Object.keys(finalData).forEach(elem => {
      data[elem] = finalData[elem].validVal
    })
    await fetchWithRetry({...data, ref: reff, callData: call,}, 5, 1000)

  }, [finalData])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.show()
    tg.MainButton.setParams({
      text: regText,
      color: "#888888"
    })
  }, [regText]);

  useEffect(() => {
    const arr = Object.values(finalData).map(elem => elem.isChecked)

    if (arr.includes(false)) {
      setChecked(false)
      tgDisable(tg)
    } else {
      tgEnable(tg)
      setChecked(true)
    }

  }, [finalData])

  return (<>
    {!isLoading ?
      < div
        className={styles.bigcontainer}>
        <img
          className={styles.image}
          src={inAppimageUrl}
          alt={"SkyNet"}
        />
        <div className={styles.container}>
          <div className={styles.popup}>
            {currentDate > Data ?
              <>
                <div className={styles.text}>Регистрация на мероприятие уже закончилась</div>
              </>
              : <>

                <MyInput
                  field={{
                    textType: "input",
                    placeholder: "Телефон",
                    name: "phone",
                    title: "Телефон: ",
                    minCheck: 11,
                    maxCheck: 12,
                    validator: "",
                    isBeDisable: false
                  }}
                  checkFn={Validators.PhoneIsCorrect}
                  validatorFn={Validators.phoneValidator}
                />
                <MyInput
                  field={{
                    textType: "textarea",
                    placeholder: "Ф.И.О. (кирилицей)",
                    name: "name",
                    title: "Ф.И.О.: ",
                    minCheck: 11,
                    maxCheck: 12,
                    validator: "",
                    isBeDisable: false
                  }}
                  checkFn={Validators.NameIsCorrect}
                  validatorFn={Validators.nameValidator}
                />

                {!isLoading ? Fields.map(field => {
                  return <MyInput
                    key={field.title}
                    field={field}
                    checkFn={Validators.otherCorrect}
                    validatorFn={Validators.otherValidator}
                  />

                }) : <></>}
              </>
            }
            {/*{JSON.stringify(checked)}*/}
            {/*<button onClick={onSendData}>done</button>*/}
          </div>
        </div>
      </div>
      :
      <Spinner/>
    }

  </>)
    ;
}

export default Game;
