import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
const layoutIOS = (props) => {
  const { runFirst1, permalinkUrl } = props;
  return (
    <View>
      <WebView
        ref={(refs) => (webview = refs)}
        source={{
          uri: permalinkUrl,
        }}
        injectedJavaScript={runFirst1}
        userAgent={"webview"}
        startInLoadingState
        onMessage={(event) => {}}
        useWebKit={true}
      ></WebView>
    </View>
  );
};
export default layoutIOS;
