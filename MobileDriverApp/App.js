import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import RequestsScreen from "./screens/RequestsScreen";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <RequestsScreen />
    </SafeAreaView>
  );
};

export default App;