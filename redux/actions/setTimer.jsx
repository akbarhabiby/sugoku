export default function setTimer(timer = true) {
  return { type: 'SET_TIMER', payload: timer }
}
