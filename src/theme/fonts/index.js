import * as Font from "expo-font"

export const initFonts = async () => {
  // ...
  // Load Fonts
  // ⬇
  await Font.loadAsync({
    "Roboto": require("./Roboto-Regular.ttf"),
    "Roboto-Regular": require("./Roboto-Regular.ttf"),
    "Roboto-Medium": require("./Roboto-Medium.ttf"),
    "Roboto-Bold": require("./Roboto-Bold.ttf"),
    "Roboto-Italic": require("./Roboto-Italic.ttf"),
    "Roboto-Light": require("./Roboto-Light.ttf"),
    "Roboto-Thin": require("./Roboto-Thin.ttf"),
  })
}


export const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
};
