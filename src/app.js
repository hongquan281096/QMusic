import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NavContainer from "./containers/NavContainer";
import SongsContainer from "./containers/SongContainer";
import PlayerContainer from "./containers/PlayerContainer";
import { initFonts } from "./theme/fonts";

const store = configureStore();

export default function App() {
  useEffect(() => {
    initFonts();
  });
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <NavContainer />
        {/* <SongsContainer /> */}
        {/* <PlayerContainer /> */}
      </SafeAreaProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
});
