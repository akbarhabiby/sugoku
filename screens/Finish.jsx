import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

export default function Finish({ route: { params: { name, status } }, navigation: { replace } }) {
  return (
    <View style={[styles.container]}>
      { status == 'solved' ? <Text style={[[styles.bold]]}>Congratulations {name}!</Text> : <Text style={[[styles.bold]]}>So Sad {name}...</Text>}
      <Text style={[[styles['mb-10'], [styles['mt-10']]]]}>Your Puzzle Status is {status}</Text>
      <Button title={'Start New Game'} onPress={() => replace('Home')} />
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
  'mt-10': {
    marginTop: 10
  },
  'mb-10': {
    marginBottom: 10
  },
  bold: {
    fontWeight: 'bold'
  }
})