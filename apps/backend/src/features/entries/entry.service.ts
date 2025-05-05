// This would eventually call Prisma or another DB client.
export async function getAllEntries() {
  // Mock data for now
  return [
    { id: 1, title: "First Entry" },
    { id: 2, title: "Second Entry" },
  ];
}
