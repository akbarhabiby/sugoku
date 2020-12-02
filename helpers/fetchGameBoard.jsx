import { setGameBoard, setLoading, setSolveBoard, setTimer } from '../redux/actions/'

export default function fetchGameBoard(difficulty) {
  return dispatch => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + difficulty)
      .then(res => res.json())
      .then(board => {
        dispatch(setGameBoard(board))
        dispatch(setSolveBoard(board))
        dispatch(setLoading(false))
        dispatch(setTimer())
      })
      .catch(console.warn)
  }
}
