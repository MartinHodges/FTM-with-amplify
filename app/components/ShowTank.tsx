import { Button } from "@aws-amplify/ui-react"
import { Pencil, Trash2 } from "lucide-react"
import { TankExtended } from "../types/TankType"

type Props = {
  tank: TankExtended
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  editing: boolean
}

export function ShowTank({tank, onEdit, onDelete, editing}: Props) {
  return (
    <tr>
      <td>{tank?.id}</td>
      <td>{tank?.tankType}</td>
      <td>{tank?.tank}</td>
      <td>
          <Button
            onClick={() => onEdit(tank.id)}
            size="small"
            variation="link"
            disabled={editing}
          >
            <Pencil size={16} />
          </Button>
          <Button
            onClick={() => onDelete(tank.id)}
            size="small"
            variation="link"
            disabled={editing}
          >
            <Trash2 size={16} />
          </Button>
      </td>
    </tr>
  )
}