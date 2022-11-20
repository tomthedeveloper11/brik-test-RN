import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "./src/screens/home_screen"
import DetailScreen from "./src/screens/detail_screen"

import { Provider } from "react-redux"
import { Store } from "./src/redux/store"
const Stack = createNativeStackNavigator()

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
