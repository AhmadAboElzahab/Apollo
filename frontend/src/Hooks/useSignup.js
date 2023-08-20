import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('null')
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password,name) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password ,name})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message);
    }
    if (response.ok) {
   setMessage(json)

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error ,message}
}