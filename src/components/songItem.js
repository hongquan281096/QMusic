import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import colors from "../configs/fontAndColor";
import { Ionicons } from "@expo/vector-icons";
const songItem = (props) => {
  const { playPause } = props;
  const { title, id } = props.item;
  const { avatarUrl, username } = props.item && props.item.user;
  const selectedItem = props.selectedId;
  return (
    <TouchableHighlight opacity={0.1} onPress={props.callBack}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image
              source={{ uri: avatarUrl }}
              resizeMode="cover"
              style={[
                styles.image,
                selectedItem === id ? { opacity: 0.5 } : null,
              ]}
            />
            {selectedItem === id && (
              <View style={styles.iconPlay}>
                <Ionicons
                  name={playPause ? "pause" : "play"}
                  size={30}
                  color={colors.textSearch}
                />
              </View>
            )}

            {/* <View style={styles.iconPause}>
            <AntDesign name="caretright" size={30} color="black" />
          </View> */}
          </View>
          <View style={styles.TextView}>
            <View style={styles.textSongView}>
              <Text style={styles.textSong}>{title}</Text>
              <Text style={styles.textSinger}>{username}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  container: { paddingTop: 8, paddingBottom: 8 },
  content: {
    flexDirection: "row",
    marginHorizontal: 12,
  },
  imageView: {
    flex: 2,
  },
  image: {
    height: 70,
  },
  TextView: {
    flex: 9,
  },
  textSongView: {
    paddingLeft: 10,
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
    position: "absolute",
    alignSelf: "center",
    top: 20,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
  },
});

export default songItem;
