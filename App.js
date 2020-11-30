import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native'

export default function App() {
  const [gameBoard, setGameBoard] = useState({})
  const [loading, setLoading] = useState(true)
  const [difficulty, setDifficulty] = useState('easy')
  const [name, setName] = useState('')
  const [nameStatus, setNameStatus] = useState(false)

  // * Fetch or GET on page mounted
  useEffect(() => {
    setLoading(true)
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + difficulty)
      .then(res => res.json())
      .then(board => {
        setGameBoard(board)
        setLoading(false)
      })
  }, [difficulty])

  // * Main Functions
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  const encodeParams = (params) => Object.keys(params).map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&')

  // * Shows Solution (Auto Solve)
  const showSolution = () => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(gameBoard)
    })
      .then(res => res.json())
      .then(({ solution }) => setGameBoard({ board: solution }))
      .catch(console.warn)
  }

  // * Shows The Status of The Sudoku (Solved or Unsolved)
  const validate = () => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(gameBoard)
    })
      .then(res => res.json())
      .then(({ status }) => {
        if (status == 'unsolved') {
          Alert.alert(`Your Puzzle is ${status}`)
        } else {
          Alert.alert(`Horray ${name}, your Puzzle is solved! Logging out...`)
          setName('')
          setNameStatus(false)
        }
      })
      .catch(console.warn)
  }

  // * Handle Functions
  const handleNameSubmit = () => {
    if (name) {
      setNameStatus(true)
      Alert.alert('Welcome ' + name)
    } else {
      Alert.alert('Name cannot be empty')
    }
  }

  const handleGiveUp = () => {
    Alert.alert('Poor ' + name)
    setNameStatus(false)
    setName('')
  }

  // * Render Page
  if (!nameStatus) {
    return (
      <View style={[styles.container]}>
        <TextInput placeholder={'Your Name'} onChangeText={(name) => setName(name)}></TextInput>
        <Button title={'Submit'} onPress={() => handleNameSubmit()} />
      </View>
    ) 
  } else if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#1876D2" />
      </View>
    )
  } else {
    return (
      <View style={[styles.container]}>
        <Text style={[styles['mb-10']]}>Hello {name}</Text>
        {/* Difficulty Status */}
        <Text>Difficulty: {difficulty[0].toUpperCase() + difficulty.slice(1)}</Text>
        
        {/* Main Board */}
        <Text style={[styles['mb-10']]}>{JSON.stringify(gameBoard)}</Text>
  
        {/* Buttons */}
        <View style={[styles['row-wrap'], styles['mt-10']]}>
          <Button title={'Validate'} onPress={() => validate()} />
          <Button title={'Auto Solve'} onPress={() => showSolution()} />
          <Button title={'Give Up'} onPress={() => handleGiveUp()} />
        </View>
  
        {/* Select Difficulty Button */}
        <Text style={[styles['mt-10']]}>Select Difficulty</Text>
        <View style={[styles['row-wrap']]}>
          <Button
            title={'Easy'}
            onPress={() => setDifficulty('easy')}
          />
          <Button
            title={'Medium'}
            onPress={() => setDifficulty('medium')}
          />
          <Button
            title={'Hard'}
            onPress={() => setDifficulty('hard')}
          />
          <Button
            title={'Random'}
            onPress={() => setDifficulty('random')}
          />
        </View>
      </View>
    )
  }
  
}

// * Styling (CSS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'row-wrap': {
    flexDirection: 'row'
  },
  'mt-10': {
    marginTop: 10
  },
  'mb-10': {
    marginBottom: 10
  }
})
