import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import colors from "../configs/fontAndColor";
import { useSelector, useDispatch } from "react-redux";
import { getListMusic } from "../actions/getMusic";
import SongItem from "./songItem";
import Player from "../components/player";
const { width } = Dimensions.get("window");
let offset = 0;
const songs = () => {
  const { fetching, items, itemDetails, selectedId, pausePlay } = useSelector(
    (state) => state.getLisMusicReducer
  );
  const [isPause,setIsPause] =useState(true)
  const dispatch = useDispatch();
  const [isRefreshing, setRefreshing] = useState(false);
  const _handleRefreshing = async () => {
    setRefreshing(true);
    offset = 0;
    dispatch(getListMusic({ offset }));
    setRefreshing(false);
  };
  useEffect(() => {
    offset = 0;
    dispatch(getListMusic({ offset }));
  }, []);
  const handleCallBack = (item) => {
    dispatch(getListMusic({ songId: item.id }));
  };
  const handlePlayPause = async () => {
    // await dispatch(getListMusic({ songId: selectedId, type: "pausePlay" }));
    setIsPause(!isPause)
  };
  const handleGoBack = async () => {
    await dispatch(getListMusic({ songId: selectedId, backId: selectedId }));
  };

  const handleGoForward = async () => {
    await dispatch(getListMusic({ songId: selectedId, forwardId: selectedId }));
  };
  const handleLoading = async () => {
    offset += 20;
    await dispatch(getListMusic({ type: "loadMore", offset }));
  };
  const renderItemSeparator = () => {
    return (
      <View
        style={{ flex: 1, height: 1, backgroundColor: "#dfe4e8", opacity: 0.1 }}
      />
    );
  };
  if (!fetching && items.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.search,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.color,
            fontSize: colors.fontSize20,
          }}
        >
          Không tìm thấy bài hát
        </Text>
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={styles.FlatList}
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => {
            return (
              <SongItem
                item={item}
                index={index}
                callBack={() => handleCallBack(item)}
                selectedId={selectedId}
                playPause={isPause}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={_handleRefreshing}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => handleLoading()}
          initialNumToRender={10}
          ItemSeparatorComponent={renderItemSeparator}
        ></FlatList>
        {fetching && (
          <ActivityIndicator
            size="large"
            color={colors.textSearch}
            style={styles.loading}
          />
        )}
      </View>
      {itemDetails && (
        <Player
          itemDetails={itemDetails}
          selectedId={selectedId}
          handleGoBack={handleGoBack}
          handleGoForward={handleGoForward}
          handlePlayPause={handlePlayPause}
          playPause={isPause}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  FlatList: {
    backgroundColor: colors.search,
    marginTop: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    top: width / 2,
    alignSelf: "center",
  },
});

export default songs;
