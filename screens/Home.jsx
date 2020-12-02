import React, { useState, useEffect } from 'react'
import RadioForm from 'react-native-simple-radio-button'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  Image
} from 'react-native'

export default function Home({ navigation: { replace } }) {
  // * Local State
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('easy')

  // * Handle Functions
  const handleNameSubmit = () => {
    if (name && difficulty) {
      replace('Game', { name, difficulty })
    } else {
      Alert.alert('name or difficulty cannot be empty')
    }
  }

  // * componentDidUnmount
  useEffect(() => {
    return () => {
      setName('')
      setDifficulty('easy')
    }
  }, [])

  // * Radio Props
  const radio_props = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
    { label: 'Random', value: 'random' }
  ]

  // * Shows Home Screen
  return (
    <View style={[styles['container']]}>
      <Text style={[[styles['bold'], { fontSize: 20 }]]}>Welcome To Sudoku Game!</Text>
      <Image source={require('../assets/icon.png')} />
      <Text style={[[styles['mt-20']], [styles.bold]]}>Enter Your Name:</Text>
      <TextInput
        placeholder={'Your Name'}
        onChangeText={(name) => setName(name)}
        value={name}
        style={[[styles['input']]]}
        placeholderTextColor={'#fff'}
      />

      {/* Select Difficulty Button */}
      <Text style={[[styles['mt-20']], [styles.bold]]}>Select Difficulty</Text>
      <View style={[[styles['mb-20']]]}>
        <RadioForm
          radio_props={radio_props}
          formHorizontal={true}
          animation={false}
          onPress={val => setDifficulty(val)}
        />
      </View>

      <Button title={'Play'} onPress={() => handleNameSubmit()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  input: {
    margin: 15,
    padding: 10,
    height: 40,
    width: 200,
    backgroundColor: '#1876D2',
    borderRadius: 15,
    color: '#fff'
  },
  'mt-20': {
    marginTop: 20
  },
  'mb-20': {
    marginBottom: 20
  }
})