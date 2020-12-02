import { cloneDeep } from 'lodash'

const initialState = {
  gameBoard: {},
  solveBoard: {},
  loading: true,
  timer: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_GAMEBOARD':
      return { ...state, gameBoard: cloneDeep(action.payload) }
    case 'SET_SOLVEBOARD':
      return { ...state, solveBoard: cloneDeep(action.payload) }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_BOX_VALUE':
      const { objRowCol: { row, col }, value } = action.payload
      const newBoard = [...state.gameBoard.board]
      newBoard[row][col] = value
      return { ...state, gameBoard: {...state.gameBoard, board : newBoard } }
    case 'SET_TIMER':
      return { ...state, timer: action.payload }
    default:
      return state
  }
}