import { View, Text, FlatList, Touchable, Pressable,StyleSheet } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect, useState } from 'react'
import { todos } from '@/utils/todo';
import { Link } from '@react-navigation/native';
import { router, useFocusEffect } from 'expo-router';



const navigateToCreateTodo = () =>{
  router.navigate('./CreateTodo')
}



const index = () => {
  const [todosData, setTodosData] = useState<any>(todos)
  const [reload, setReload] = useState<any>(false)
useFocusEffect(

  useCallback(()=>{
    // console.log(todos)
    alert('reload')
    setTodosData(todos)
  },[todos])
)
useEffect(()=>{
  setTodosData(todosData)
},[reload])
  const renderTodo = ({ item }: any) => {
    return (
      <View style={styles.todoItem}>
        <Text style={item.done == true ? {textDecorationLine:'line-through'}:{}}>{item.todoName}</Text>
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

  const deleteTodo = (item:any) =>{
    alert(item.id)
    const filterdTodos = todosData.filter((todo:any)=> {
      if(todo.id != item.id){
        return todo
      }
    })
    // alert('delete')
    console.log(filterdTodos)
    setTodosData(filterdTodos)
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