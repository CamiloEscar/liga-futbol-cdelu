import { useState } from 'react'

interface UpdateDataResult {
  isLoading: boolean
  error: string | null
  updateData: (data: any, dataType: string) => Promise<void>
}

export function useUpdateData(): UpdateDataResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateData = async (data: any, dataType: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/updateData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, dataType }),
      })

      if (!response.ok) {
        throw new Error('Failed to update data')
      }

      const result = await response.json()
      console.log(result.message)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, updateData }
}