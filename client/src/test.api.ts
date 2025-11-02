export async function testApiConnection() {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/movies')
    if (!response.ok) throw new Error('HTTP error: ' + response.status)

    const data = await response.json()
    console.log('✅ API connected successfully. Movies:', data)
  } catch (error) {
    console.error('❌ API request failed:', error)
  }
}
