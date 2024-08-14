import React from 'react';

function MyInput(props) {
  const {mytype, className, val, placeholder, callBack, validator, dis} = props

  const handler = (event) => {
    const value = event.target.value
    const isValid = validator(value, val)
    callBack(isValid)
  }
  if (mytype) {

    return (
      <textarea className={className} value={val} placeholder={placeholder} onChange={handler} disabled={dis}/>
    );
  } else {
    return <input type={"tel"} className={className} value={val} placeholder={placeholder} onChange={handler}/>
  }
}

export default MyInput;
