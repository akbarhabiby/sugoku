import React, { useState } from 'react'
import {
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setBoxValue } from '../redux/actions/'

export default function Box({ data, index }) {
  const { row, col } = index
  const dispatch = useDispatch()
  const box = useSelector(state => state.gameBoard.board[row][col])
  const initBox = useSelector(state => state.solveBoard.board[row][col])


  if (initBox !== 0) return (
    <Text style={[[style.container]]}>{data}</Text>
  )

  return (
    <TextInput
      onChangeText={val => dispatch(setBoxValue(index, val))}
      style={[[style.container]]}
      value={box !== 0 ? box.toString() : ''}
      keyboardType={'numeric'}
      maxLength={1}
    />
  )
}

const style = StyleSheet.create({
  container: {
    padding: 12,
    borderColor: 'black',
    borderWidth: 1,
    width: 40,
    height: 40
  }
})
