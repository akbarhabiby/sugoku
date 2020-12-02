import React, { useEffect, useState } from 'react'
import { Box } from '../components/'
import { fetchGameBoard, getBoardSolution, validateGameBoard } from '../helpers/'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button
} from 'react-native'
import { setTimer } from '../redux/actions/'

// * Main Game Function
export default function Game({ route: { params: { name, difficulty } }, navigation: { replace } }) {
  // * React-Redux
  const { gameBoard, solveBoard, loading, timer } = useSelector(state => state)

  // * Dispatch
  const dispatch = useDispatch()

  // * Fetch or GET on page mounted
  useEffect(() => {
    dispatch(fetchGameBoard(difficulty))
  }, [])

  // * Set Time Local State
  useEffect(() => {
    if (timer) {
      let time = 600
      let userTime = 0

      const interval = setInterval(() => {
        time -= 1
        userTime++
        if(time == 0) {
          clearInterval(interval)
          validateGameBoard(gameBoard)
            .then(status => {
              dispatch(setTimer(false))
              replace('Finish', { name: name, status: status })
            })
        }
      }, 1000)
    }
  }, [timer])

  // * Shows Solution ( Auto Solve)
  const showSolution = () => {
    dispatch(getBoardSolution(solveBoard))
  }

  // * Shows The Status of The Sudoku (Solved or Unsolved)
  const validate = async () => {
    const status = await validateGameBoard(gameBoard)
    if (status == 'solved') {
      replace('Finish', { name: name, status: status })
    } else {
      Alert.alert('Puzzle Status', `Your Puzzle is still ${status}...`)
    }
  }

  // * Handle Give Up
  const handleGiveUp = () => {
    Alert.alert('Surrender?', 'Are you sure you want to Give Up?', [
      {
        text: `I'm Done`,
        onPress: () => replace('Finish', { name: name, status: 'surrender' })
      },
      {
        text: 'Cancel'
      }
    ])
  }

  // * Shows Loading
  if (loading) return (
    <View style={[[styles['container']]]}>
      <ActivityIndicator size={'large'} color={'#1876D2'} />
    </View>
  )
  

  // * Shows Game Screen
  return (
    <View style={[[styles['container']]]}>
      <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>{`${difficulty[0].toUpperCase() + difficulty.slice(1)} Mode`}</Text>

      <Text>Waktu tersisa {}</Text>
      {/* Main Game */}
      <View>
        {gameBoard.board.map((row, i) => (
          <View key={i} style={{ flexDirection: 'row' }}>
            {row.map((col, j) => (
              <Box key={j} data={col} index={{ row: i, col: j }} />
            ))}
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={[[styles['row-wrap'], [styles['mt-10']]]]}>
        <Button title={'Validate'} onPress={() => validate()} />
        <Button title={'Auto Solve'} onPress={() => showSolution()} />
        <Button title={'Give Up'} onPress={() => handleGiveUp()} />
      </View>
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
  'row-wrap': {
    flexDirection: 'row'
  },
  'mt-10': {
    marginTop: 10,
  }
})