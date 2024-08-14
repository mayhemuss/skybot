export const tgEnable = (tg) => {
  tg.MainButton.enable()
  tg.MainButton.setParams({
    color: "rgb(105,179,45)"
  })
}
export const tgDisable = (tg) => {
  tg.MainButton.disable()
  tg.MainButton.setParams({
    color: "#888888"
  })
}

export const tgStart = (tg, obj)=>{
  tg.ready()
  tg.MainButton.show()
  tg.MainButton.setParams({
    text: obj.regText,
    color: "#888888"
  })
}
