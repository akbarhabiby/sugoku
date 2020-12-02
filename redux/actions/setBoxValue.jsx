export default function setBoxValue(objRowCol, value) {
  return { type: 'SET_BOX_VALUE', payload: { objRowCol, value } }
}