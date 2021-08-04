import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  BackHandler,
} from "react-native";
import colors from "../configs/fontAndColor";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import MarqueeText from "react-native-marquee";
import { WebView } from "react-native-webview";
import LayoutIOS from "./layoutIOS";
import { useSelector, useDispatch } from "react-redux";
import { getListMusic } from "../actions/getMusic";
const Player = (props) => {
  const { itemDetails, selectedId, playPause } = props;
  const dispatch = useDispatch();
  if (!itemDetails.user || itemDetails.id !== selectedId) {
    return null;
  }
  const { title, id, permalink_url } = itemDetails;
  console.log("object;", permalink_url);
  const { avatar_url, username } = itemDetails && itemDetails.user;
  const runFirst1 = `
  document.body.style.backgroundColor = '#222';
    setTimeout(function(){
    // document.getElementById("tokenInput__comment").focus()
    // document.getElementById("tokenInput__comment").click()
    document.querySelector('a.snippetUXPlayButton.sc-button-play.playButton.sc-button.m-stretch').click();
  },1500);
  true ; // note: this is required, or you'll sometimes get silent failures
  `;
  const runFirst = `
  document.body.style.backgroundColor = '#222';
    setTimeout(function(){
    // document.querySelector("div.playbackTimeline__progressBar").style.width= "25%";
    // document.querySelector('a.snippetUXPlayButton.sc-button-play.playButton.sc-button.m-stretch').click();
    // document.getElementById("tokenInput__comment").focus().click()
    // document.querySelector('a.snippetUXPlayButton.sc-button-play.playButton.sc-button.m-stretch').click();
    document.querySelector("div.fullHero__foreground.fullListenHero__foreground").click();document.querySelector("span.sc-artwork.sc-artwork-placeholder-8.image__full.g-opacity-transition").click()
  },1500);
  true ; // note: this is required, or you'll sometimes get silent failures
  `;

  const handlePlayPause = () => {
    props.handlePlayPause();
  };
  const handleGoBack = () => {
    props.handleGoBack();
  };
  const handleGoForward = () => {
    props.handleGoForward();
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image
              source={{ uri: avatar_url }}
              resizeMode="cover"
              style={[styles.image]}
            />
          </View>
          <View style={styles.TextView}>
            <View style={styles.TextViewMusic}>
              <MarqueeText
                duration={7000}
                marqueeOnStart
                loop
                marqueeDelay={0}
                marqueeResetDelay={0}
              >
                <Text style={styles.textSong}>{title}</Text>
              </MarqueeText>
              <MarqueeText
                duration={7000}
                marqueeOnStart
                loop
                marqueeDelay={0}
                marqueeResetDelay={0}
              >
                <Text style={styles.textSinger}>{username}</Text>
              </MarqueeText>
            </View>
          </View>
          <View style={styles.ViewIcon}>
            <View style={styles.iconPlay}>
              <TouchableHighlight onPress={handleGoBack}>
                <AntDesign
                  name="banckward"
                  size={20}
                  color={colors.textSearch}
                />
              </TouchableHighlight>

              <TouchableHighlight onPress={handlePlayPause}>
                <FontAwesome
                  name={playPause ? "pause" : "play"}
                  size={20}
                  color={colors.textSearch}
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={handleGoForward}>
                <AntDesign name="forward" size={20} color={colors.textSearch} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      {Platform.OS === "ios" && playPause && (
        <LayoutIOS runFirst1={runFirst1} permalink_url={permalink_url} />
      )}
      // {Platform.OS === "android" && playPause && (
         // <WebView
         // ref={(refs) => (webview = refs)}
         // source={{
           // uri: permalink_url,
         // }}
         // injectedJavaScript={runFirst1}
         // userAgent={"webview"}
         // startInLoadingState
         // onMessage={(event) => {}}
         // useWebKit={true}
       // ></WebView>
      // )}
    </>
  );
};
const styles = StyleSheet.create({
  container: { marginHorizontal: 12 },
  content: {
    flexDirection: "row",
  },
  imageView: {
    flex: 1.5,
    padding: colors.pd7,
  },
  image: {
    height: 60,
    borderRadius: 100,
  },
  TextView: {
    flex: 5,
  },
  TextViewMusic: {
    padding: colors.pd7,
  },
  ViewIcon: {
    flex: 3,
    alignSelf: "center",
  },
  textSong: {
    color: colors.color,
    fontSize: colors.fontSize17,
    fontFamily: colors.fontStyle,
  },
  textSinger: {
    fontSize: colors.fontSize17,
    color: colors.textSearch,
    fontFamily: colors.fontStyle,
  },
  iconPlay: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Player;
