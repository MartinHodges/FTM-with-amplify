import { Button, Input, SelectField } from "@aws-amplify/ui-react"
import { Check, X } from "lucide-react"
import React, { useState } from "react"
import { TankExtended, TankTypeValues } from "../types/TankType"

type Props = {
  tank: TankExtended
  onSave: (tank: TankExtended ) => void
  onCancel: () => void
}

export function EditTank({tank, onSave, onCancel}: Props) {

  const [tankUpdate, setTankUpdate] = useState<TankExtended>(tank)

  const onTankNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTankUpdate({...tankUpdate, tank: event.target.value})
  }

  const onTankTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTankUpdate({...tankUpdate, tankType: event.target.value})
  }

  return (
    <tr>
      <td>{tankUpdate?.id}</td>
      <td>
        <SelectField
          label=''
          value={tankUpdate.tankType || ''}
          placeholder='Select tank type'
          onChange={onTankTypeChange}
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
          onChange={onTankNameChange}
          placeholder='Name of tank'
          value={tankUpdate.tank}
          style={{height: '40px'}}
        />
      </td>
      <td>
          <Button
            onClick={() => onSave(tankUpdate)}
            size="small"
            variation="link"
          >
            <Check size={16} />
          </Button>
          <Button
            onClick={() => onCancel()}
            size="small"
            variation="link"
          >
            <X size={16} />
          </Button>
      </td>
    </tr>
  )
}