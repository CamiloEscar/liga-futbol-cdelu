import React, { useState } from 'react'
import { useUpdateData } from '../hooks/useUpdateData'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DataUpdater() {
  const { isLoading, error, updateData } = useUpdateData()
  const [dataType, setDataType] = useState<string>('')
  const [data, setData] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (dataType && data) {
      await updateData(JSON.parse(data), dataType)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="dataType">Data Type</Label>
        <Select onValueChange={setDataType} value={dataType}>
          <SelectTrigger id="dataType">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="teams">Teams</SelectItem>
            <SelectItem value="players">Players</SelectItem>
            <SelectItem value="matches">Matches</SelectItem>
            <SelectItem value="news">News</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="data">Data (JSON format)</Label>
        <Input
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder='{"key": "value"}'
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Data'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}