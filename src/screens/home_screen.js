import { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"

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
} from "react-native"
import axios from "axios"
import Ionicons from "@expo/vector-icons/Ionicons"

export default function HomeScreen({ navigation }) {
  const limit = 20
  const [page, setPage] = useState(0)
  const [items, setItems] = useState([])
  const [tempItems, setTempItems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: "",
  })
  const [query, setQuery] = useState("")
  const baseUrl = "https://dummyjson.com"

  const onChange = (name, value) => {
    setNewItem({ ...newItem, [name]: value })
  }

  const getItems = async () => {
    const url = `${baseUrl}/products?limit=${limit}&skip=${page}`
    const res = await axios.get(url)
    setPage(page + limit)
    setItems((prevItems) => [...prevItems, ...res.data.products])
    setTempItems((prevItems) => [...prevItems, ...res.data.products])
    return res
  }

  const addItem = async () => {
    console.log("kepanggil additem")
    const url = `${baseUrl}/products/add`
    const res = await axios.post(
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
    console.log(res.status, "Add Item Success")
    setNewItem({
      title: "",
      description: "",
      price: "",
    })
  }

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Update Item", { item })}
    >
      <View style={styles.item}>
        <Text style={styles.title}>
          {item.id} - {item.title}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  )
  const renderItem = ({ item }) => <Item item={item} />

  useEffect(() => {
    getItems()
      .then((res) => {
        setItems(res.data.products)
        setTempItems(res.data.products)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 40,
          margin: 16,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            left: 10,
          }}
        >
          <Ionicons
            name="search-outline"
            size={28}
            color="green"
            style={{ margin: 8 }}
          />
        </View>
        <TextInput
          name="query"
          style={styles.searchBar}
          onChangeText={(value) => setQuery(value)}
          value={query}
          placeholder="Macbook Pro"
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
              multiline={true}
              numberOfLines={10}
              style={[{ height: 200, textAlignVertical: "top" }, styles.input]}
              onChangeText={(value) => onChange("description", value)}
              placeholder="Best Iphone Ever"
              value={newItem.description}
            />

            <Text style={styles.label}>Price</Text>

            <TextInput
              name="price"
              style={styles.input}
              onChangeText={(value) => onChange("price", value)}
              value={newItem.price}
              placeholder="25.000.000"
              keyboardType="numeric"
            />
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  addItem()
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Add Item</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 60,
          height: 60,
          backgroundColor: "#fff",
          borderRadius: 100,
          zIndex: 20,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-outline" size={38} color="green" />
      </TouchableOpacity>
      <FlatList
        data={items
          .filter((item) => {
            if (query === "") {
              return item
            } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
              return item
            }
          })
          .map((item) => item)
          .sort((a, b) => a.id - b.id)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={getItems}
      />
      <StatusBar style="auto" animated="true" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 11,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: 200,
    maxHeight: 120,
    marginBottom: 16,
    marginTop: 0,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
  },
})
