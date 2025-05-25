import { useEffect, useState } from "react"
import { ShowTank } from "./ShowTank"
import { EditTank } from "./EditTank"
import { TankExtended } from "../types/TankType"
import CreateTank from "./CreateTank"
import { client } from "../initAmplifyClient"

// Define column widths as percentages
const columnWidths = {
  id: "20%",
  tankType: "30%",
  tank: "40%",
  actions: "10%"
}

export default function ShowAquarium() {
  const [tanks, setTanks] = useState<TankExtended[]>([])
  const [error, setError] = useState<string | null>(null)
  const [tankInEdit, setTankInEdit] = useState<string | null>(null)
  
  useEffect(() => {
    // Set up subscription for real-time updates
    const subscription = client.models.Aquarium.observeQuery()
      .subscribe({
        next: ({ items, isSynced }) => {
          setTanks([...items])
          
          if (isSynced) {
            console.log('Initial sync completed')
          }
        },
        error: (error) => {
          console.error("Subscription error:", error)
          setError("Failed to subscribe to tank updates.")
        }
      })
    
    // Clean up subscription when component unmounts
    return () => subscription.unsubscribe()
  }, [])
  
  const doEdit = (tankId: string) => {
    setTankInEdit(tankId)
  }

  const doSave = async (tank: TankExtended) => {
    await client.models.Aquarium.update(tank)
    setTankInEdit(null)
  }

  const doDelete = async (tankId: string) => {
    try {
      await client.models.Aquarium.delete({id: tankId});      
    } catch (error) {
      console.error('Error deleting tank:', error)
    }
  }

  const doCancelEdit = () => {
    setTankInEdit(null)
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="min-w-100">
      <table className="table-auto w-full border-separate border-spacing-3">
        <thead>
          <tr>
            <td style={{ width: columnWidths.id }}><b>ID</b></td>
            <td style={{ width: columnWidths.tankType }}><b>Tank Type</b></td>
            <td style={{ width: columnWidths.tank }}><b>Tank</b></td>
            <td style={{ width: columnWidths.actions }}><b>Action</b></td>
          </tr>
        </thead>
        <tbody>
          {tanks.length > 0 ? (
            tanks.map((tank) => (
                tankInEdit !== tank.id ? (
                  <ShowTank
                    key={tank.id}
                    tank={tank}
                    onEdit={doEdit}
                    onDelete={doDelete}
                    editing={!!tankInEdit}
                  />
                ) : (
                  <EditTank
                    key={tank.id}
                    tank={tank}
                    onSave={doSave}
                    onCancel={doCancelEdit}
                  />
                )
              )
            )
          ) : (
            <tr>
              <td colSpan={3}>No tanks found</td>
            </tr>
          )}
          <CreateTank />
        </tbody>
      </table>
    </div>
  )
}
