import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../configs/fontAndColor";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { getListMusic } from "../actions/getMusic";
import Songs from '../components/songs';
const { width } = Dimensions.get("window");
const nav = () => {
  const dispatch = useDispatch();
  const [txtSearch, SetTxtSearch] = useState("");
  const latestSearchText = useRef(txtSearch);
  const handleSearch = (value) => {
    SetTxtSearch(value);
  };
  const handleSearchApi = async () => {
    await dispatch(
      getListMusic({ type: "search", textSearch: txtSearch, offset: 0 })
    );
  };
  const delayedQuery = React.useCallback(
    debounce(() => {
      if (txtSearch !== latestSearchText.current) {
        latestSearchText.current = txtSearch;
        dispatch(
          getListMusic({ type: "search", textSearch: txtSearch, offset: 0 })
        );
      }
    }, 700),
    [txtSearch]
  );
  useEffect(() => {
    delayedQuery();
    // Cancel previous debounce calls during useEffect cleanup.
    return delayedQuery.cancel;
  }, [delayedQuery]);
  const handleClear = () => {
    SetTxtSearch("");
  };
  return (
    <>
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleSearchApi}>
        <View style={styles.titlePosition}>
          <Text style={styles.titleColor}>QMusic MP3</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.search}>
        <TouchableWithoutFeedback onPress={handleSearchApi}>
          <View style={styles.glass}>
            <Ionicons
              name="search"
              size={25}
              style={styles.glassIcon}
              color={colors.glass}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.textInputView}>
          <TextInput
            placeholderTextColor={colors.glass}
            placeholder="Search"
            style={styles.textInput}
            onChangeText={handleSearch}
            value={txtSearch}
          ></TextInput>
        </View>
        <View style={styles.closeView}>
          {txtSearch.length > 2 && (
            <TouchableWithoutFeedback onPress={handleClear}>
              <AntDesign
                name="close"
                style={styles.close}
                size={20}
                color="black"
              />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </View>
    <Songs />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    paddingTop: 25,
  },
  titlePosition: {
    alignItems: "center",
    height: 50,
  },
  titleColor: {
    color: colors.color,
    fontSize: colors.fontSize,
    fontWeight: colors.fontWeight,
  },
  search: {
    flexDirection: "row",
    backgroundColor: colors.search,
    marginHorizontal: 12,
    padding: colors.pd3,
  },
  glassIcon: {
    backgroundColor: "#222",
    padding: colors.pd7,
    textAlign: "center",
  },
  glass: { flex: 2 },
  textInputView: { flex: 8 },
  closeView: { flex: 1, alignSelf: "center" },
  textInput: {
    color: colors.textSearch,
    fontSize: colors.fontSize20,
    padding: colors.pd7,
    width: width / 1.45,
  },
  close: {
    padding: colors.pd9,
    color: colors.textSearch,
    paddingRight: 5,
  },
});

export default nav;
