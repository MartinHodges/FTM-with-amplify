'use client'

import { Button, Input, SelectField } from '@aws-amplify/ui-react'
import { ChangeEvent, useState } from 'react'
import { Tank, TankTypeValues } from '../types/TankType'
import { client } from '../initAmplifyClient'

export default function CreateTank() {
  const [tank, setTank] = useState<Tank>({
    tank: '',
    tankType: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const captureTankName = (event: ChangeEvent<HTMLInputElement>) => {
    setTank({...tank, tank: event.target.value || ''})
  }

  const captureTankType = (event: ChangeEvent<HTMLSelectElement>) => {
    setTank({...tank, tankType: event.target.value})
  }

  const createTank = async () => {
    setIsLoading(true)
    const { errors } = await client.models.Aquarium.create(tank)
    if (errors) {
      setError(errors.map((error) => error.message).join('\n'))
    } else {
      setError(null)
    }
    setTank({
      tank: '',
      tankType: ''
    })
    setIsLoading(false)
  }

  return (
    <>
      <tr>
        <td></td>
        <td>
          <SelectField
            label=''
            value={tank.tankType}
            placeholder='Select tank type'
            onChange={captureTankType}
            style={{height: '40px', marginTop: '-8px'}}
          >
            {TankTypeValues.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>
        </td>
        <td>
          <Input 
            onChange={captureTankName}
            placeholder='Name of tank'
            value={tank.tank}
          />
        </td>
        <td>
          <Button 
            onClick={createTank} 
            isDisabled={!tank.tank.length || !tank.tankType.length || isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </td>
      </tr>
      {error && 
        <tr>
          <td colSpan={4} style={{ color: 'red' }}>{error}</td>
        </tr>
      }
    </>
  )
}
