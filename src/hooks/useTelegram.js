const tg = window.Telegram.WebApp

export function useTelegram() {
  const onClose = () => {
    tg.close()
  }

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }
  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user
  }
}


const j = {
  "initData": "",
  "initDataUnsafe": {},
  "version": "7.6",
  "platform": "tdesktop",
  "colorScheme": "dark",
  "themeParams": {
    "accent_text_color": "#6ab2f2",
    "bg_color": "#17212b",
    "button_color": "#5288c1",
    "button_text_color": "#ffffff",
    "destructive_text_color": "#ec3942",
    "header_bg_color": "#17212b",
    "hint_color": "#708499",
    "link_color": "#6ab3f3",
    "secondary_bg_color": "#232e3c",
    "section_bg_color": "#17212b",
    "section_header_text_color": "#6ab3f3",
    "section_separator_color": "#111921",
    "subtitle_text_color": "#708499",
    "text_color": "#f5f5f5"
  },
  "isExpanded": true,
  "viewportHeight": 590,
  "viewportStableHeight": 590,
  "isClosingConfirmationEnabled": false,
  "isVerticalSwipesEnabled": true,
  "headerColor": "#17212b",
  "backgroundColor": "#17212b",
  "BackButton": {"isVisible": false},
  "MainButton": {
    "text": "CONTINUE",
    "color": "#5288c1",
    "textColor": "#ffffff",
    "isVisible": false,
    "isProgressVisible": false,
    "isActive": true
  },
  "SettingsButton": {"isVisible": false},
  "HapticFeedback": {},
  "CloudStorage": {},
  "BiometricManager": {
    "isInited": false,
    "isBiometricAvailable": false,
    "biometricType": "unknown",
    "isAccessRequested": false,
    "isAccessGranted": false,
    "isBiometricTokenSaved": false,
    "deviceId": ""
  }
}
