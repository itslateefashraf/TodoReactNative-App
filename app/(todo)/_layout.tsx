import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
            title:'Todo Home'
        }}
      />
      <Stack.Screen
        name='CreateTodo'
        options={{
            title:'Create Todo',
            headerRight:()=>(<Ionicons name='pencil' size={30} color='crimson'/>)
        }}
      />
    </Stack>
  )
}

export default _layout