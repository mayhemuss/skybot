import React from 'react';

function MyInput(props) {
  const {mytype, className, val, placeholder, callBack, validator, command, user} = props

  const handler = (event) => {
    const value = event.target.value
    const isValid = validator(value, val)
    const type = mytype ? "name" : "phone"
    const otherType = mytype ? "phone" : "name"
    callBack(prev => {

      console.log()
      return {
        ...prev,
        [user]: {
          ...prev[user],
          // ...[other],
          [type]: isValid
        }
      }
    })
  }
  if (mytype) {

    return (
      <textarea className={className} value={val} placeholder={placeholder} onChange={handler}/>
    );
  } else {
    return <input type={"tel"} className={className} value={val} placeholder={placeholder} onChange={handler}/>
  }
  return <></>
}

export default MyInput;
