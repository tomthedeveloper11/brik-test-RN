import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "./src/screens/home_screen"
import DetailScreen from "./src/screens/detail_screen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Update Item" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
