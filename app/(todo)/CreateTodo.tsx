import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { todos } from '@/utils/todo';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';



const CreateTodo = () => {
  const [todo, setTodo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { id } = useLocalSearchParams()

  const saveTodo = async() => {
    try {
      console.log(todos.length)

    if(todo == ''){
      Alert.alert('Required', 'Please enter a todo!')
      return
    }

    let data = {
      todoName:todo,
      date: new Date(),
      done:false
    }

    setLoading(true)
    await addDoc(collection(db, "todos"), data);
    Alert.alert('Success', 'Todo saved successfully!')
    setLoading(false)

    // todos.push(data)
    router.back()
    } catch (error) {
      console.log(error)
    }
  }

  if(isLoading){
    return ( <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>)
  }
  
  return (
    <View style={styles.container}>
      <Text>CreateTodo</Text>
      <Text>{id}</Text>
      <Text>{todo}</Text>

      <TextInput style={styles.input}
        placeholder="enter your message here"
        value={todo}
        onChangeText={(text) => setTodo(text)}

      />
      <TouchableOpacity onPress={() =>
        saveTodo()
      } >
        <View style={styles.view}>
          <Text style={styles.text}>Save Todo</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: 'red',
    borderColor:'black',
    borderWidth:1,
    borderRadius:4,
    padding:20,
    width:'90%'
  },
  todoBtn: {
    backgroundColor:'crimson',
    padding:20,
    marginTop:30,
  },
  view : {
    width:250,
    height:50,
    backgroundColor : "crimson",
    alignItems : "center",
    justifyContent : "center",
    borderColor : "black",
    borderWidth : 0.2,
    margin:30
  },
  text : {
    // fontSize : 20,
    color : "white"
  },

})
export default CreateTodo