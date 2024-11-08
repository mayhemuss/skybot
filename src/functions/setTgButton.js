

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


