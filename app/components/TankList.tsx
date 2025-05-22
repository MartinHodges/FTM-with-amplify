import { Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function() {

  const [tanks, setTanks] = useState<Schema["Aquarium"]["type"][]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fetchTanks = async () => {
    try {
      const { data: items, errors } = await client.models.Aquarium.list(
        {selectionSet: ['id', 'tank', 'tankType']}
      );
      
      if (errors) {
        console.error("Errors fetching tanks:", errors);
        setError("Failed to fetch tanks. See console for details.");
        return;
      }
      
      // Filter out any items that might cause rendering issues
      const validItems = items.filter(item => item && item.id);
      setTanks(validItems);
    } catch (err) {
      console.error("Exception fetching tanks:", err);
      setError("An error occurred while fetching tanks.");
    }
  };

  useEffect(() => {
    fetchTanks();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2>Tank List</h2>
      <div className="min-w-100">
        <table className="table-auto w-full border-separate border-spacing-3">
          <thead>
            <tr>
              <td><b>ID</b></td>
              <td><b>Tank Type</b></td>
              <td><b>Tank</b></td>
            </tr>
          </thead>
          <tbody>
            {tanks.length > 0 ? (
              tanks.map((tank) => (
                <tr key={tank?.id}>
                  <td>{tank?.id}</td>
                  <td>{tank?.tankType}</td>
                  <td>{tank?.tank}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No tanks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
