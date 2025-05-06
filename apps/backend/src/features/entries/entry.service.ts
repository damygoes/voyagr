import { EntrySchema } from "@voyagr/schema/entrySchema";

// This would eventually call Prisma or another DB client.
export async function getAllEntries(): Promise<EntrySchema[]> {
  // Mock data for now
  return [
    {
      entry_id: "123e4567-e89b-12d3-a456-426614174000",
      user_id: "123e4567-e89b-12d3-a456-426614174001",
      title: "First Entry",
      description: "Description for first entry",
      location: {
        latitude: 40.7128,
        longitude: -74.006,
        placeName: "New York City",
      },
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      entry_id: "223e4567-e89b-12d3-a456-426614174000",
      user_id: "123e4567-e89b-12d3-a456-426614174001",
      title: "Second Entry",
      description: "Description for second entry",
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
        placeName: "Los Angeles",
      },
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ];
}
