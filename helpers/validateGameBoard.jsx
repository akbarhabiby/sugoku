import encodeParams from './encodeParams'

export default function validateGameBoard(objBoard) {
  return fetch('https://sugoku.herokuapp.com/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeParams(objBoard)
  })
    .then(res => res.json())
    .then(({ status }) => {
      return status
    })
    .catch(console.warn)
}