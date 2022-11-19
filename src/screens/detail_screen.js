import { StatusBar } from "expo-status-bar"
import axios from "axios"

import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  TextInput,
  Image,
} from "react-native"
import { useEffect, useState } from "react"

const baseUrl = "https://dummyjson.com"

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params

  const [newItem, setNewItem] = useState({
    title: item.title,
    description: item.description,
    price: item.price,
  })
  console.log(newItem)

  const onChange = (name, value) => {
    if (name == "price") {
      setNewItem({ ...newItem, [name]: +value })
    } else {
      setNewItem({ ...newItem, [name]: Number(value) })
    }
  }

  const updateItem = async () => {
    console.log("kepanggil updateItem")
    const url = `${baseUrl}/products/${item.id}`
    const res = await axios.put(
      url,
      JSON.stringify({
        title: newItem.title,
        description: newItem.description,
        price: newItem.price,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    console.log(res.status, "Update Item Success")
  }
  return (
    <>
      <SafeAreaView>
        <Image
          style={{ height: 300, resizeMode: "cover", }}
          source={{ uri: `${item.thumbnail}` }}
        />
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            name="title"
            style={styles.input}
            onChangeText={(value) => onChange("title", value)}
            placeholder="Iphone 20"
            value={newItem.title}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            name="description"
            style={styles.input}
            onChangeText={(value) => onChange("description", value)}
            placeholder="Best Iphone Ever"
            multiline={true}
            value={newItem.description}
            selection={{ start: 0 }}
          />
          <Text style={styles.label}>Price</Text>

          <TextInput
            name="price"
            style={styles.input}
            onChangeText={(value) => onChange("price", value)}
            placeholder="250000"
            value={`${newItem.price}`}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              updateItem()
              navigation.goBack()
            }}
          >
            <Text style={styles.textStyle}>Update Item</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    margin: 16
  },
  title: {
    fontSize: 68,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 30,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    maxHeight: 120,
    marginBottom: 16,
    marginTop: 0,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
})
