// import React from 'react';
//
// import styles from "./OneUser.module.scss";
// import MyInput from "../MyInput";
// import {nameValidator, phoneValidator} from "../../functions/correctPhoneandName";
//
// function OneUser(props) {
//   const {command, callBack, user} = props
//
//   return (
//     <>
//       {Object.keys(command).length > 1 ? <div className={styles.userName}>{user}</div> : <></>}
//
//       <div className={styles.text}> Телефон:</div>
//       <MyInput
//         mytype={false}
//         val={command[user].phone}
//         validator={phoneValidator}
//         className={styles.phone}
//         callBack={callBack}
//         command={command}
//         user={user}
//         placeholder={"89991234567"}
//       />
//       <div className={styles.text}> Ф.И.О.:</div>
//       {/*<div ref={ref}>*/}
//       <MyInput
//         mytype={true}
//         val={command[user].name}
//         user={user}
//         command={command}
//         callBack={callBack}
//         className={styles.name}
//         placeholder={"Ф.И.О. (кирилицей)"}
//         validator={nameValidator}
//       />
//       {/*</div>*/}
//     </>
//   )
//     ;
// }
//
// export default OneUser;
