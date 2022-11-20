import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "./src/screens/home_screen"
import DetailScreen from "./src/screens/detail_screen"

import { Provider } from "react-redux"
import { Store } from "./src/redux/store"
const Stack = createNativeStackNavigator()

import { setErrorHandler } from "expo-error-log/setErrorHandler.js"
import { Alert, Platform } from "react-native"

const myErrorHandler = (e) => {
  console.log(e)
  Alert.alert(
    "ALERT",
    "Sorry there was an error, please restart the app",
    [{ text: "Dismiss", onPress: () => console.log("dismissing alert") }],
    { cancelable: false }
  )
}

setErrorHandler({
  cb: myErrorHandler,
  data: {
    OS: Platform.OS,
    OSVersion: Platform.Version,
  },
})

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Update Item" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
