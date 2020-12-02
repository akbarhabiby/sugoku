import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Home,
  Game,
  Finish
} from './screens'
import { Provider } from 'react-redux'
import store from './redux/store/'

const { Navigator, Screen } = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator headerMode={'none'}>
          <Screen name={'Home'} component={Home} />
          <Screen name={'Game'} component={Game} />
          <Screen name={'Finish'} component={Finish} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  )
}
