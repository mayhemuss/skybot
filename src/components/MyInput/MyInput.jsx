import React, {useEffect, useState} from 'react';
import good from "../../images/SVG/good.svg"
import bad from "../../images/SVG/bad.svg"
import styles from "./MyInput.module.scss"
import {otherCorrect, otherValidator} from "../../functions/Validators";
import {useDispatch, useSelector} from "react-redux";
import {getCommandName, queryActions} from "../../slice/query";
import {fieldsActions} from "../../slice/fields";

function MyInput(props) {
  const {

    field,
    checkFn,
    validatorFn,
  } = props

  const {
    textType,
    placeholder,
    name, //: "commandName",
    title,
    minCheck,
    maxCheck,
    validator,
    isBeDisable
  } = field

  const commandName = useSelector(getCommandName)
  const dispatch = useDispatch()

  const [text, setText] = useState("")
  const [isCheck, setIsCheck] = useState(false)

  useEffect(() => {
    if(name ==="commandName" && commandName!==""){
      dispatch(fieldsActions.setparams({name, validVal: commandName, isChecked: true}))
      setText(commandName)
      setIsCheck(true)
    }else {
      dispatch(fieldsActions.setparams({name, validVal: "", isChecked: false}))
    }
  }, []);

  const handler = (event) => {
    const value = event.target.value
    const validVal = validatorFn(value, text, validator, maxCheck)


    setText(validVal)
    const isChecked = checkFn(validVal, minCheck)
    dispatch(fieldsActions.setparams({name, validVal, isChecked}))
    if (isChecked) {
      setIsCheck(true)

    } else {
      setIsCheck(false)
    }

  }
  if (textType === "textarea") {

    return (
      <>
        <div className={styles.text}>{title}</div>
        <div className={styles.container}
        >
        <textarea
          className={styles.input}
          value={text} placeholder={placeholder} onChange={handler} disabled={isBeDisable && commandName !== ""}/>
          <img
            src={isCheck ? good : bad}
            className={styles.goodImg}/>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.text}>{title}</div>
        <div className={styles.container}
        >
          <input
            className={styles.input}
            type={"tel"} value={text} placeholder={placeholder} onChange={handler}/>
          <img
            src={isCheck ? good : bad}
            className={styles.goodImg}/>
        </div>
      </>
    )
  }
}

export default MyInput;
