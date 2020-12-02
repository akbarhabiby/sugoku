import { setGameBoard } from '../redux/actions'
import encodeParams from './encodeParams'

export default function getBoardSolution(objBoard) {
  return dispatch => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(objBoard)
    })
      .then(res => res.json())
      .then(({ solution }) => dispatch(setGameBoard({ board: solution })))
      .catch(console.warn)
  }
}
