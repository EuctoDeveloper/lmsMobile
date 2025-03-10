import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const ZoomMeeting = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://us05web.zoom.us/j/8718856346?pwd=TXg2dklLZVRIbGhndVk2OTZWT0J5dz09" }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

export default ZoomMeeting;
