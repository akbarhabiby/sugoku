export default function setLoading(isLoading = true) {
  return { type: 'SET_LOADING', payload: isLoading }
}
