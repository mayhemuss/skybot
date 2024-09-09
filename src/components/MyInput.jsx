import React from 'react';
import good from "../images/SVG/good.svg"
import bad from "../images/SVG/bad.svg"

function MyInput(props) {
  const {mytype, className, val, placeholder, callBack, validator, dis, check} = props

  const handler = (event) => {
    const value = event.target.value
    const isValid = validator(value, val)
    callBack(isValid)
  }
  if (mytype) {

    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "10px"
      }}>
        <textarea className={className} value={val} placeholder={placeholder} onChange={handler} disabled={dis}/>
        <img
          src={check ? good : bad}
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingLeft: "2%",
          }}/>
      </div>
    );
  } else {
    return (<div style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "10px"
      }}>
        <input type={"tel"} className={className} value={val} placeholder={placeholder} onChange={handler}/>
        <img
          src={check ? good : bad}
          style={{
            paddingLeft: "2%",
            width: "10%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",

          }}/>
      </div>
    )
  }
}

export default MyInput;
