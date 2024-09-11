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
        marginBottom: "10px",
        width:"100%",
        backgroundColor: "white",
        padding:"7px",
        borderRadius: "10px"
      }}
      >
        <textarea
          style={{
            border:"none",
          width:"90%",
            resize: "none",
            fontFamily: "Roboto",
            fontSize: "23px",
padding:"7px"
          }}
          value={val} placeholder={placeholder} onChange={handler} disabled={dis}/>
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
        marginBottom: "10px",
        width:"100%",
        backgroundColor: "white",
        padding:"7px",
        borderRadius: "10px"
      }}
      >
        <input
          style={{
            border:"none",
            width:"90%",
            resize: "none",
            fontFamily: "Roboto",
            fontSize: "23px",
padding:"7px"
          }}
          type={"tel"}  value={val} placeholder={placeholder} onChange={handler}/>
        <img
          src={check ? good : bad}
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingLeft: "2%",
          }}
        />
      </div>
    )
  }
}

export default MyInput;
