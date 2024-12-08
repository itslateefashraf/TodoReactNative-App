import { View, Text, FlatList, Touchable, Pressable,StyleSheet, Alert, ActivityIndicator } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect, useState } from 'react'
// import { todos } from '@/utils/todo';
import { Link } from '@react-navigation/native';
import { router, useFocusEffect } from 'expo-router';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';



const navigateToCreateTodo = () =>{
  router.navigate('./CreateTodo')
}



const index = () => {
  const [todosData, setTodosData] = useState<any>()
  const [reload, setReload] = useState<any>(false)
  const [isLoading, setLoading] = useState<any>(false)

useFocusEffect(

  useCallback(()=>{
    getTodos()
  },[])
)

const getTodos = async()=>{
 try {
  // alert('getting toddos')
  const docSnap = await getDocs(collection(db,'todos'))
    const todoList =  docSnap.docs.map((doc:any) => ({id:doc.id, ...doc.data() }) )
    console.log(todoList)
    setTodosData(todoList)
 } catch (error) {
  console.log(error)
 }
}
  useEffect(()=>{
    getTodos()
  },[reload])

  const renderTodo = ({ item }: any) => {
    return (
      <View style={styles.todoItem}>
        <Text style={[item.done == true ? {textDecorationLine:'line-through'}:{},{flex:1}]}>{item.todoName}</Text>
        <View style={styles.todoIcons}>
          {!item.done && <Ionicons  name="checkmark-circle-outline" size={30} color="green" onPress={()=> doneTodo(item)} />}
          {item.done && <Ionicons  name="close-circle-outline" size={30} color="red" onPress={()=> doneTodo(item)} />}
          <Ionicons name="trash" size={30} color="red" onPress={() => deleteTodo(item)} />
        </View>
        {/* <Text>{item.done.toString()}</Text>
        <Text>{item.id.toString()}</Text> */}
      </View>
    )
  }

  const deleteTodo = async(item:any) =>{
   try {
    // alert(item.id)
    const docRef =  doc(db,'todos',item.id)
    setLoading(true)
    await deleteDoc(docRef)
    setLoading(false)
    Alert.alert('Success','Record deleted successfully')
    setReload((prev:any) => !prev)
    // const filterdTodos = todosData.filter((todo:any)=> {
    //   if(todo.id != item.id){
    //     return todo
    //   }
    // })
    // alert('delete')
    // console.log(filterdTodos)
    // setTodosData(filterdTodos)
   } catch (error) {
    console.log(error)
   }
  }
  
  const doneTodo = (item:any) => {
    alert(item.id)
    todosData.find((todo:any)=> {
      if(todo.id === item.id){
        todo.done = !todo.done
      }
    })
    setReload((prev:any) => !prev)
  }


  if(isLoading){
    return ( <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>)
  }

  return (

    <View style={styles.container}>
      <Text style={{textAlign:'center',fontSize:30,margin:10}}>TODOS</Text>
      <FlatList
        data={todosData}
        renderItem={renderTodo}
        keyExtractor={item => item.id.toString()}
      />

<Link screen="CreateTodo" params={{ id: 'jane' }}>
      Go to Jane's profile
    </Link>
      <Pressable style={styles.addTodo} onPress={()=>  navigateToCreateTodo()}>
        <Ionicons name="add-circle" size={80} color="green" />
      </Pressable>
      

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10,
  },
  addTodo:{
    position:'absolute',
    bottom:10,
    right:0
  },
  todoItem: {
    flexDirection:'row',
    borderBottomWidth:1,
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    backgroundColor:'#fff'

  },
  todoIcons: {
    flexDirection:'row',
    gap:5,

  }
})

export default index